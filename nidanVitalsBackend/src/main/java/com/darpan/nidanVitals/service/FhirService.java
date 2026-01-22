package com.darpan.nidanVitals.service;

import com.darpan.nidanVitals.dto.VitalsInputDTO;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Observation;

import java.util.List;

public interface FhirService {

    Observation createFhirObservation(VitalsInputDTO vitalsInputDTO);
    String SerializeObservationResource(Observation observation);
    String SerializeBundleResource(Bundle bundle);
    Observation DeserializeObservationResource(String fhirJson);
    Bundle CreateFhirBundle(List<Observation> observations);
}
