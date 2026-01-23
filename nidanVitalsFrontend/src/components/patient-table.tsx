import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useEffect, useState } from "react";
import getBaseUrl from "../utils/apiConfig";
import { parsePatientVitalsFromBundle } from "@/lib/fhir-utility";



const PatientTable = () => {

    

    useEffect(() => {
        const fetchPatientVitals = async () => {
            try {
                const response = await axios.get(getBaseUrl());
                console.log("Patient Vitals Data:", response.data);
                 parsePatientVitalsFromBundle(response.data);

            }catch (error) {
                console.error("Error fetching patient vitals:", error);
            }
        }
        fetchPatientVitals()},[]
    )

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow">
            <h4 className="text-lg font-semibold pb-8">🔍 Search Patient</h4>
            <Field orientation="horizontal">
            <Input className="bg-white" type="search" placeholder="Patient ID" />
            <Button>Search</Button>
            </Field>

            <Tabs defaultValue="all" className="mt-6">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="normal">Normal</TabsTrigger>
                    <TabsTrigger value="overweight">Overweight</TabsTrigger>
                    <TabsTrigger value="obese">Obese</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 w-full">
                    
                </TabsContent>
                <TabsContent value="normal" className="mt-4">
                    
                </TabsContent>
                <TabsContent value="overweight" className="mt-4">
                    
                </TabsContent>
                <TabsContent value="obese" className="mt-4">
                    
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default PatientTable;