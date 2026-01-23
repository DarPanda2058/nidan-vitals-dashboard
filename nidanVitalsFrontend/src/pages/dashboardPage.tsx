import PatientTable from "@/components/patient-table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import VitalsForm from "@/components/vitals-form";

const DashboardPage = () => {
    return (
        <div className="max-w-7xl p-5">
            <div className="mb-8 p-5">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Nidan Vitals Management System
            </h1>
            <p className="text-gray-600">
                Patient vitals monitoring and management dashboard.
            </p>
            <Tabs defaultValue="overview" className="mt-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="patients">Add New Vitals Record</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4 w-full">
                    <div className="p-4 w-full bg-blue-50 rounded-lg shadow">
                        <PatientTable />
                    </div>

                </TabsContent>
                <TabsContent value="patients" className="mt-4">
                    <div className="p-4 bg-blue-50 rounded-lg shadow-2xl">
                        <VitalsForm />
                    </div>
                </TabsContent>
            </Tabs>
            </div>
        </div>
    )
}
export default DashboardPage;