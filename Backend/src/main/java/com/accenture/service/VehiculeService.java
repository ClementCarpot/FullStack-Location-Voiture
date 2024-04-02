package com.accenture.service;

import com.accenture.dal.entity.vehicules.Vehicule;

import java.util.List;

public interface VehiculeService {
    Vehicule getVehiculeById(int id);
    List<Object> getVehicules();

    List<Object> getCampingCars();

    List<Object> getVoitures();

    List<Object> getMotos();

    List<Object> getVelos();

    List<Object> getUtilitaires();
}
