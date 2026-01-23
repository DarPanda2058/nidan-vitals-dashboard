package com.darpan.nidanVitals.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VitalsInputDTO {
    private String patientId;
    private Double height;
    private Double weight;
    private Double bmi;
    private Integer systolicBp;
    private Integer diastolicBp;
}
