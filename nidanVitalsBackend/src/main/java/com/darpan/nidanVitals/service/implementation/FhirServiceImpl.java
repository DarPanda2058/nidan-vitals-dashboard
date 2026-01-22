package com.darpan.nidanVitals.service.implementation;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import com.darpan.nidanVitals.dto.VitalsInputDTO;
import com.darpan.nidanVitals.service.FhirService;
import org.hl7.fhir.r4.model.*;
import org.springframework.stereotype.Service;

@Service
public class FhirServiceImpl implements FhirService {
    private final FhirContext fhirContext = FhirContext.forR4();
    private final IParser iParser = fhirContext.newJsonParser();

    @Override
    public Observation createFhirObservation(VitalsInputDTO vitalsInputDTO) {
        Observation observation = new Observation();
        observation.setStatus(Observation.ObservationStatus.FINAL);

        //top level code
        Coding coding = observation.getCode().addCoding();
        coding.setCode("85353-1").setSystem("http://loinc.org");

        //referencing to the patient who's the observation is about
        Reference subject = new Reference();
        subject.setReference(vitalsInputDTO.getPatientId());
        observation.setSubject(subject);

        //components
        //height
        observation.addComponent()
                .setCode(new CodeableConcept().addCoding(new Coding("http://loinc.org","8302-2","Body Height")))
                .setValue(new Quantity().setValue(vitalsInputDTO.getHeight()).setUnit("cm").setSystem("http://loinc.org").setCode("cm"));
        //weight
        observation.addComponent()
                .setCode(new CodeableConcept().addCoding(new Coding("http://loinc.org","29463-7", "Body Weight")))
                .setValue(new Quantity().setValue(vitalsInputDTO.getWeight()).setUnit("kg").setSystem("http://loinc.org").setCode("kg"));
        //bmi
        observation.addComponent()
                .setCode(new CodeableConcept().addCoding(new Coding("http://loinc.org","39156-5","BMI")))
                .setValue(new Quantity().setValue(vitalsInputDTO.getBmi()).setUnit("kg/m2").setSystem("http://loinc.org").setCode("kg/m2"));
        //systolic
        observation.addComponent()
                .setCode(new CodeableConcept().addCoding(new Coding("http://loinc.org","8480-6","Systolic Blood Pressure")))
                .setValue(new Quantity().setValue(vitalsInputDTO.getSystolicBp()).setUnit("mm[Hg]").setSystem("http://loinc.org").setCode("mm[Hg]"));
        //diastolic
        observation.addComponent()
                .setCode(new CodeableConcept().addCoding(new Coding("http://loinc.org","8462-4","Diastolic Blood Pressure")))
                .setValue(new Quantity().setValue(vitalsInputDTO.getDiastolicBp()).setUnit("mm[Hg]").setSystem("http://loinc.org").setCode("mm[Hg]"));
        return observation;
    }

    public String SerializeObservationResource(Observation observation){
        return iParser.encodeResourceToString(observation);
    }

    public Observation DeserializeObservationResource(String rawJson){
        return iParser.parseResource(Observation.class,rawJson);
    }
}
