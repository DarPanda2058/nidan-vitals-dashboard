package com.darpan.nidanVitals.controller;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import com.darpan.nidanVitals.dto.VitalsInputDTO;
import com.darpan.nidanVitals.service.FhirService;
import org.hl7.fhir.r4.model.Observation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fhir")
@CrossOrigin("http://localhost:3000")
public class DashboardController {

    private final FhirService fhirService;

    DashboardController(FhirService fhirService){
        this.fhirService = fhirService;
    }

    @PostMapping("/observation")
    public ResponseEntity<String> createObservation(@RequestBody VitalsInputDTO vitalsInputDTO){
        try {
            //convert into FHIR Observation Resource
            fhirService.createFhirObservation(vitalsInputDTO);


        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error: "+e.getMessage());
        }
    }
}
