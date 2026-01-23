import { Button } from "./ui/button";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {useForm} from "react-hook-form";
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

interface BMICategory{
    category: string;
    bgColor: string;
    textColor: string;
}

const getBmiCategory = (bmi: number): BMICategory => {
    if (bmi < 18.5) {
        return { category: "Underweight", bgColor: "bg-blue-100", textColor: "text-blue-800" };
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return { category: "Normal weight", bgColor: "bg-green-100", textColor: "text-green-800" };
    } else if (bmi >= 25 && bmi < 29.9) {
        return { category: "Overweight", bgColor: "bg-orange-200", textColor: "text-orange-500" };
    } else {
        return { category: "Obesity", bgColor: "bg-red-100", textColor: "text-red-800" };
    }
}

const VitalsForm = () => {
  const {register, handleSubmit, formState, watch, reset} = useForm<VitalsFormData>();
  const { errors } = formState;
  const [bmi, setBmi] = useState<number>(0);
  const [bmiCategory, setBmiCategory] = useState<BMICategory | null>(null);
  

  const height = watch('height');
  const weight = watch('weight');
  const systolicBp = watch('systolicBp');
  const diastolicBp = watch('diastolicBp');
  
  useEffect(() => {
    if (height && weight && height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      const roundedBmi = Math.round(calculatedBmi * 10) / 10;
      setBmi(roundedBmi);
      setBmiCategory(getBmiCategory(roundedBmi));
    } else {
      setBmi(0);
      setBmiCategory(null);
    }
  }, [height, weight]);

    const isHypertension = systolicBp && diastolicBp && (systolicBp >= 140 || diastolicBp >= 90);

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
            setBmiCategory(null);
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
                <form className="space-y-1" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        {
                            bmiCategory && (
                                <div className={`w-full p-4 rounded-lg shadow-md ${bmiCategory.bgColor}`}>
                                    <p className={`text-base font-semibold ${bmiCategory.textColor}`}>
                                        Your BMI is <span className="font-bold">{bmi}</span> - {bmiCategory.category}
                                    </p>
                                </div>
                            )
                        }
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
                        {
                            isHypertension && (
                                <div className="w-full p-4 rounded-lg shadow-md bg-red-50">
                                    <p className="text-base font-semibold text-red-800">
                                        Hypertension detected
                                    </p>
                                    <p className="text-sm text-red-700 mt-1">
                                        Systolic BP ≥ 140 or Diastolic BP ≥ 90
                                    </p>
                                </div>
                            )
                        } 
                        <Button variant="default" type="submit" className="mt-4">Submit Vitals</Button>
                        
                </form>
            </CardContent>
        </Card>
    </div>
  )
}
export default VitalsForm;