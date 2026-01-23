import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
const PatientTable = () => {

    

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow">
            <h4 className="text-lg font-semibold pb-8">🔍 Search Patient</h4>
            <Field orientation="horizontal">
            <Input className="bg-white" type="search" placeholder="Patient ID" />
            <Button>Search</Button>
            </Field>

            <Tabs defaultValue="overview" className="mt-6">
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