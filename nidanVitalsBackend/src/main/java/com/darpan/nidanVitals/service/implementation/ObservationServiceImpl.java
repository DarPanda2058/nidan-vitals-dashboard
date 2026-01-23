package com.darpan.nidanVitals.service.implementation;

import com.darpan.nidanVitals.dto.VitalsInputDTO;
import com.darpan.nidanVitals.model.Patient;
import com.darpan.nidanVitals.repository.ObservationRepository;
import com.darpan.nidanVitals.service.FhirService;
import com.darpan.nidanVitals.service.ObservationService;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Observation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ObservationServiceImpl implements ObservationService {

    private final FhirService fhirService;
    private final ObservationRepository observationRepository;
    ObservationServiceImpl(FhirService fhirService, ObservationRepository observationRepository){
        this.fhirService = fhirService;
        this.observationRepository = observationRepository;
    }

    @Override
    public String setObservation(VitalsInputDTO vitalsInputDTO) {
        Optional<Patient> tempPatient = observationRepository.findByPatientId(vitalsInputDTO.getPatientId());
        if(tempPatient.isPresent()){
            throw new RuntimeException("Patient already exists.");
        }
        Observation observation = fhirService.createFhirObservation(vitalsInputDTO);
        String rawFhirJson = fhirService.SerializeObservationResource(observation);
        Patient patient = new Patient();
        patient.setBmi(vitalsInputDTO.getBmi());
        patient.setRawFhirJson(rawFhirJson);
        patient.setPatientId(vitalsInputDTO.getPatientId());
        observationRepository.save(patient);
        return rawFhirJson;
    }

    @Override
    public String getObservation(String patientId) {
        if (patientId == null){
            List<Patient> patientList = observationRepository.findAll();
            if(patientList.isEmpty()){
                throw new RuntimeException("No Patient Detected");
            }
            List<Observation> observations = patientList.stream()
                    .map(patient -> fhirService.DeserializeObservationResource(patient.getRawFhirJson()))
                    .toList();

            Bundle bundle = fhirService.CreateFhirBundle(observations);
            return fhirService.SerializeBundleResource(bundle);

        }else{
            Optional<Patient> patient = observationRepository.findByPatientId(patientId);
            if (patient.isEmpty()){
                throw new RuntimeException("No Patient Detected");
            }
            return patient.get().getRawFhirJson();
        }
    }
}
