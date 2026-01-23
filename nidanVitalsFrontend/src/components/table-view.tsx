import { getStatusFromBmi } from "@/lib/fhir-utility";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type PatientVital = {
    patientId: string;
    heightCm: number | null;
    weightKg: number | null;
    bmi: number | null;
    systolic: number | null;
    diastolic: number | null;
};
const TableView = ({patients}: {patients: PatientVital[]}) => {
    return(
        <Table>
            <TableCaption>Patient Vitals Records</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead className="text-center">Height (cm)</TableHead>
                    <TableHead className="text-center">Weight (kg)</TableHead>
                    <TableHead className="text-center">BMI</TableHead>
                    <TableHead className="text-center">Systolic (mmHg)</TableHead>
                    <TableHead className="text-center">Diastolic (mmHg)</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {patients.map((vital, index) => (
                    <TableRow key={index}>
                        <TableCell>{vital.patientId}</TableCell>
                        <TableCell className="text-center">{vital.heightCm}</TableCell>
                        <TableCell className="text-center">{vital.weightKg}</TableCell>
                        <TableCell className="text-center">{vital.bmi}</TableCell>
                        <TableCell className="text-center">{vital.systolic}</TableCell>
                        <TableCell className="text-center">{vital.diastolic}</TableCell>
                        <TableCell>{getStatusFromBmi(vital.bmi)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default TableView;