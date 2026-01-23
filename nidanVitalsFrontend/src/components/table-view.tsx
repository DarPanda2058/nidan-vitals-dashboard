import { getStatusFromBmi } from "@/lib/fhir-utility";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

type PatientVital = {
    patientId: string;
    heightCm: number | null;
    weightKg: number | null;
    bmi: number | null;
    systolic: number | null;
    diastolic: number | null;
};
const TableView = ({patients}: {patients: PatientVital[]}) => {

    const renderBMIStatusBadge = (bmi: number) => {
        switch (getStatusFromBmi(bmi).toLowerCase()) {
            case "normal":
                return (
                    <Badge className="bg-green-100 text-green-800">
                        Normal BMI
                    </Badge>
                );
            case "overweight":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800">
                        Overweight
                    </Badge>
                );
            case "obese":
                return (
                    <Badge className="bg-red-100 text-red-800">
                        Obese
                    </Badge>
                );
            case "underweight":
                return (
                    <Badge className="bg-blue-100 text-blue-800">
                        Underweight
                    </Badge>
                );
        }
    };
    const renderHypertensionStatusBadge = (systolic: number, diastolic: number) => {
        if (systolic >= 140 || diastolic >= 90) {
            return (
                <Badge className="bg-red-100 text-red-800">
                    Hypertension
                </Badge>
            );
        };
    }

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
                        <TableCell>
                            {
                                renderBMIStatusBadge(vital.bmi || 0)
                            }
                            {'  '}
                            {
                                renderHypertensionStatusBadge(vital.systolic || 0, vital.diastolic || 0)
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default TableView;