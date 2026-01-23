import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useEffect, useState } from "react";
import getBaseUrl from "../utils/apiConfig";
import { getStatusFromBmi, parsePatientVitalsFromBundle } from "@/lib/fhir-utility";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";
import TableView from "./table-view";

type PatientVitalRecord = {
    patientId: string;
    heightCm: number | null;
    weightKg: number | null;
    bmi: number | null;
    systolic: number | null;
    diastolic: number | null;
};



const PatientTable = () => {

const [patientVitals, setPatientVitals] = useState<PatientVitalRecord[]>( []);
    const [searchTerm, setSearchTerm] = useState<string>("");    

    useEffect(() => {
        const fetchPatientVitals = async () => {
            try {
                const response = await axios.get(getBaseUrl());
                setPatientVitals(                 parsePatientVitalsFromBundle(response.data));
            }catch (error) {
                console.error("Error fetching patient vitals:", error);
                window.alert("Error fetching patient vitals. Please try again.");
            }
        }
        fetchPatientVitals()},[]
    )

    const filteredVitalsBySearch = patientVitals.filter(vital =>{
        const matchesSearch = vital.patientId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    })

    const filteredVitalsByStatus = (status: string) => {
        const filteredVitals = filteredVitalsBySearch.filter(vital => {
            const bmiStatus = getStatusFromBmi(vital.bmi);
            return bmiStatus.toLowerCase() === status;
        });
        return filteredVitals;
    }


    return (
        <div className="w-full p-4 bg-white rounded-lg shadow">
            <h4 className="text-lg font-semibold pb-8">🔍 Search Patient</h4>
            <Field orientation="horizontal">
            <Input className="bg-white" type="search" placeholder="Patient ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </Field>

            <Tabs defaultValue="all" className="mt-6">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="normal">Normal</TabsTrigger>
                    <TabsTrigger value="overweight">Overweight</TabsTrigger>
                    <TabsTrigger value="obese">Obese</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 w-full">
{
                        filteredVitalsBySearch.length === 0 ? (
                            <Alert variant="destructive" className="max-w-md justify-center mx-auto">
                                <AlertCircleIcon />
                                <AlertTitle>No Patients Found</AlertTitle>
                                <AlertDescription>
                                    No patient vitals records match your search. Please try again with different criteria.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            TableView({patients: filteredVitalsBySearch})
                        )
                    }                    
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