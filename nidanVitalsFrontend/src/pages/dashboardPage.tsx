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
                <TabsContent value="overview" className="mt-4">
                    <div className="p-4 bg-white rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
                        <p>Monitor Patient Vitals</p>
                        <PatientTable />
                    </div>

                </TabsContent>
                <TabsContent value="patients" className="mt-4">
                    <div className="p-4 bg-white rounded-lg shadow">
                        <VitalsForm />
                    </div>
                </TabsContent>
            </Tabs>
            </div>
        </div>
    )
}
export default DashboardPage;