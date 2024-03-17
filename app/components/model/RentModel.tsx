"use client";

import useRentModel from "@/app/hooks/useRentModel";
import Model from "./Model";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navabar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModel = () => {
  const [steps, setSteps] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const rentModel = useRentModel();
  const router = useRouter();
  const onBack = () => {
    setSteps((value) => value - 1);
  };

  const onNext = () => {
    setSteps((value) => value + 1);
  };
  const actionLabel = useMemo(() => {
    if (steps === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [steps]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (steps !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then((data) => {
        toast.success("Listing is created");
        router.refresh();
        reset();
        setSteps(STEPS.CATEGORY);
        rentModel.onClose();
      })
      .catch((err) => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  let bodyContent = (
    <>
      <div className="flex flex-col gap-8">
        <Heading
          title="Which is these best describe your place"
          subtitle="pick category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item, i) => {
            return (
              <div className="col-span-1" key={i}>
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  if (steps === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="  Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlang} />
      </div>
    );
  }

  if (steps === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          title="Guests"
          subtitle="how many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="how many Rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="how many BathRooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (steps === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (steps === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and Skeet works best"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (steps === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, Set your Price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Model
      open={rentModel.open}
      onClose={rentModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb Your Home"
    />
  );
};

export default RentModel;
