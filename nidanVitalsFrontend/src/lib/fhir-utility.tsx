import {ResourceUtils, BundleUtils} from '@smile-cdr/fhirts';

export interface PatientVital {
    patientId: string;
    heightCm: number | null;
    weightKg: number | null;
    bmi: number | null;
    systolic: number | null;
    diastolic: number | null;
}

const bundleUtil = new BundleUtils();
const resourceUtil = new ResourceUtils();

const LOINC = {
    VITALS_PANEL: "85353-1",
    HEIGHT: "8302-2",
    WEIGHT: "29463-7",
    BMI: "39156-5",
    SYSTOLIC: "8480-6",
    DIASTOLIC: "8462-4",
} as const;

const getObservationValue = (observation: any, loincCode: string): number | null => {
    const components = observation.component;
    const targetComponent = components?.find((comp: any) => {
        const coding = comp.code?.coding;
        return resourceUtil.getCodingsByProperty(coding, 'code', loincCode).length > 0;
    });

    if (targetComponent && targetComponent.valueQuantity) {
        return targetComponent.valueQuantity.value;
    }
    return null;
}

export const parsePatientVitalsFromBundle = (bundle: any): PatientVital[] => {
    
    const observations = bundleUtil.getResources(bundle.entry, 'Observation');
    console.log('Extracted Observations:', observations);

    const patientVitals: PatientVital[] = observations.map((obs: any) => {

        const patientId = obs?.resource?.subject?.reference;

        return{
            patientId: patientId || 'Unknown',
            heightCm: getObservationValue(obs?.resource, LOINC.HEIGHT),
            weightKg: getObservationValue(obs?.resource, LOINC.WEIGHT),
            bmi: getObservationValue(obs?.resource, LOINC.BMI),
            systolic: getObservationValue(obs?.resource, LOINC.SYSTOLIC),
            diastolic: getObservationValue(obs?.resource, LOINC.DIASTOLIC),
        }
    }
    );
    console.log('Parsed Patient Vitals:', patientVitals);
    return patientVitals;
    
}

