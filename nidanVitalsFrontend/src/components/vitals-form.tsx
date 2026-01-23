import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useForm} from "react-hook-form";


type VitalsFormData = {
    patientId: string;
    height: number;
    weight: number;
    systolic: number;
    diastolic: number;
}

const VitalsForm = () => {
  const {register, handleSubmit} = useForm<VitalsFormData>();
    const onSubmit = (data: VitalsFormData) => {
        console.log(data);
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
                            {...register("patientId", { required: "Username is Required"})}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Patient ID"
                        />
                        <label className="block pt-2 mb-1">Height *</label>
                        <input
                            type="number"
                            {...register("height", { required: true })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Height"
                        />
                        <label className="block pt-2 mb-1">Weight</label>
                        <input
                            type="number"
                            {...register("weight", { required: true })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Weight"
                        />
                        <label className="block pt-2 mb-1">Systolic Blood Pressure</label>
                        <input
                            type="number"
                            {...register("systolic", { required: true })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Systolic BP"
                        />
                        <label className="block pt-2 mb-1">Diastolic Blood Pressure</label>
                        <input
                            type="number"
                            {...register("diastolic", { required: true })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Enter Diastolic BP"
                        />
                        <Button variant="default" type="submit" className="mt-4">Submit Vitals</Button>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}
export default VitalsForm;