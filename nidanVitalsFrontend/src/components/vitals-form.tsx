import { Button } from "./ui/button";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useForm} from "react-hook-form";
import getBaseUrl from "../utils/apiConfig";
import { useState, useEffect } from "react";


interface VitalsFormData {
  patientId: string;
  height: number;
  weight: number;
  bmi: number;
  systolicBp: number;
  diastolicBp: number;
}

const VitalsForm = () => {
  const {register, handleSubmit, formState, watch, reset} = useForm<VitalsFormData>();
  const { errors } = formState;
  const [bmi, setBmi] = useState<number>(0);

  const height = watch('height');
  const weight = watch('weight');
  
  useEffect(() => {
    if (height && weight && height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      const roundedBmi = Math.round(calculatedBmi * 10) / 10;
      setBmi(roundedBmi);
    } else {
      setBmi(0);
    }
  }, [height, weight]);

    const onSubmit = async(data: VitalsFormData) => {
        console.log(data);
        try{
            const submitData = {
                ...data,
                bmi: bmi,
            };
            const response = await axios.post(getBaseUrl(), submitData);
            reset();
            setBmi(0);
            console.log("Vitals submitted successfully:", response.data);
            window.alert("Vitals submitted successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error submitting vitals:", error);
            window.alert("Error submitting vitals. Please try again.");
        }
    }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">Vitals Entry Form</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <label className="block mb-1">Patient ID *</label>
                        <input
                            type="text"
                            id="patientId"
                            {...register("patientId", { required: {
                                value: true, message: "Patient ID is required"
                            }})}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Patient ID"
                        />
                        <p className="text-red-500">{errors.patientId?.message}</p>
                        <label className="block pt-2 mb-1">Height *</label>
                        <input
                            type="number"
                            {...register("height", { required: {
                                value: true, message: "Height is required"
                            } })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Height"
                        />
                        <p className="text-red-500">{errors.height?.message}</p>
                        <label className="block pt-2 mb-1">Weight</label>
                        <input
                            type="number"
                            {...register("weight", { required: {
                                value: true, message: "Weight is required"
                            } })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Weight"
                        />
                        <p className="text-red-500">{errors.weight?.message}</p>
                        <label className="block pt-2 mb-1">Systolic Blood Pressure</label>
                        <input
                            type="number"
                            {...register("systolicBp", { required: {
                                value: true, message: "Systolic BP is required"
                            } })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Systolic BP"
                        />
                        <p className="text-red-500">{errors.systolicBp?.message}</p>
                        <label className="block pt-2 mb-1">Diastolic Blood Pressure</label>
                        <input
                            type="number"
                            {...register("diastolicBp", { required: {
                                value: true, message: "Diastolic BP is required"
                            } })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Diastolic BP"
                        />
                        <p className="text-red-500">{errors.diastolicBp?.message}</p>
                        <Button variant="default" type="submit" className="mt-4">Submit Vitals</Button>
                </form>
            </CardContent>
            <CardFooter>
                {
                    bmi ? <p className="text-lg font-medium">Calculated BMI: {bmi}</p>
                    : null
                }
            </CardFooter>
        </Card>
    </div>
  )
}
export default VitalsForm;