package com.accenture.controller;

import com.accenture.exception.VehiculeException;
import com.accenture.service.*;
import com.accenture.service.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicules")
@CrossOrigin(origins = "http://localhost:3000")
public class VehiculeController {

    private final VehiculeService vehiculeService;

    private final CampingCarService campingCarService;

    private final VoitureService voitureService;

    private final MotoService motoService;

    private final VeloService veloService;

    private final UtilitaireService utilitaireService;

    @Autowired
    public VehiculeController(VehiculeService vehiculeService, CampingCarService campingCarService,
            VoitureService voitureService, MotoService motoService, VeloService veloService,
            UtilitaireService utilitaireService) {
        this.vehiculeService = vehiculeService;
        this.campingCarService = campingCarService;
        this.voitureService = voitureService;
        this.motoService = motoService;
        this.veloService = veloService;
        this.utilitaireService = utilitaireService;
    }

    @GetMapping({ "", "/" })
    public List<Object> vehicules() {
        return vehiculeService.getVehicules();
    }

    @GetMapping("/campingCars")
    public List<CampingCarDto> campingCars() {
        return campingCarService.getAllCampingCars();
    }

    @GetMapping("/voitures")
    public List<VoitureDto> voitures() {
        return voitureService.getAllVoitures();
    }

    @GetMapping("/motos")
    public List<MotoDto> motos() {
        return motoService.getAllMotos();
    }

    @GetMapping("/velos")
    public List<VeloDto> velos() {
        return veloService.getAllVelos();
    }

    @GetMapping("/utilitaires")
    public List<UtilitaireDto> utilitaires() {
        return utilitaireService.getAllUtilitaires();
    }

    @PostMapping("/campingCars")
    ResponseEntity<String> ajoutCampingCar(@RequestBody CampingCarDto dto, BindingResult br) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                campingCarService.ajouter(dto);
                re = ResponseEntity.status(HttpStatus.CREATED).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @PostMapping("/voitures")
    ResponseEntity<String> ajoutVoiture(@RequestBody VoitureDto dto, BindingResult br) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                voitureService.ajouter(dto);
                re = ResponseEntity.status(HttpStatus.CREATED).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @PostMapping("/motos")
    ResponseEntity<String> ajoutMoto(@RequestBody MotoDto dto, BindingResult br) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                motoService.ajouter(dto);
                re = ResponseEntity.status(HttpStatus.CREATED).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @PostMapping("/velos")
    ResponseEntity<String> ajoutVelo(@RequestBody VeloDto dto, BindingResult br) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                veloService.ajouter(dto);
                re = ResponseEntity.status(HttpStatus.CREATED).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @PostMapping("/utilitaires")
    ResponseEntity<String> ajoutUtilitaire(@RequestBody UtilitaireDto dto, BindingResult br) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                utilitaireService.ajouter(dto);
                re = ResponseEntity.status(HttpStatus.CREATED).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @PutMapping("/campingCars/{id}")
    ResponseEntity<String> modifierCampingCar(@RequestBody CampingCarDto dto, BindingResult br,
            @PathVariable("id") int id) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                campingCarService.modifier(dto, id);
                re = ResponseEntity.status(HttpStatus.OK).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @PutMapping("/voitures/{id}")
    ResponseEntity<String> modifierVoiture(@RequestBody VoitureDto dto, BindingResult br, @PathVariable("id") int id) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                voitureService.modifier(dto, id);
                re = ResponseEntity.status(HttpStatus.OK).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @PutMapping("/motos/{id}")
    ResponseEntity<String> modifierMoto(@RequestBody MotoDto dto, BindingResult br, @PathVariable("id") int id) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                motoService.modifier(dto, id);
                re = ResponseEntity.status(HttpStatus.OK).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @PutMapping("/velos/{id}")
    ResponseEntity<String> modifierVelo(@RequestBody VeloDto dto, BindingResult br, @PathVariable("id") int id) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                veloService.modifier(dto, id);
                re = ResponseEntity.status(HttpStatus.OK).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @PutMapping("/utilitaires/{id}")
    ResponseEntity<String> modifierUtilitaire(@RequestBody UtilitaireDto dto, BindingResult br,
            @PathVariable("id") int id) {
        ResponseEntity<String> re;

        if (br.hasErrors()) {
            StringBuilder message = new StringBuilder();
            for (Object error : br.getAllErrors()) {
                message.append(error).append(" ");
            }
            re = ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(message.toString());
        } else {
            try {
                utilitaireService.modifier(dto, id);
                re = ResponseEntity.status(HttpStatus.OK).build();
            } catch (Exception e) {
                re = ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        return re;
    }

    @DeleteMapping("/campingCars/{id}")
    ResponseEntity<String> deleteCampingCar(@PathVariable("id") int id) throws VehiculeException {
        ResponseEntity<String> re;
        try {
            campingCarService.supprimer(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            campingCarService.desactiver(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        }
        return re;
    }

    @DeleteMapping("/voitures/{id}")
    ResponseEntity<String> deleteVoiture(@PathVariable("id") int id) throws VehiculeException {
        ResponseEntity<String> re;
        try {
            voitureService.supprimer(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            voitureService.desactiver(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        }
        return re;
    }

    @DeleteMapping("/motos/{id}")
    ResponseEntity<String> deleteMoto(@PathVariable("id") int id) throws VehiculeException {
        ResponseEntity<String> re;
        try {
            motoService.supprimer(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            motoService.desactiver(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        }
        return re;
    }

    @DeleteMapping("/velos/{id}")
    ResponseEntity<String> deleteVelo(@PathVariable("id") int id) throws VehiculeException {
        ResponseEntity<String> re;
        try {
            veloService.supprimer(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            veloService.desactiver(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        }
        return re;
    }

    @DeleteMapping("/utilitaires/{id}")
    ResponseEntity<String> deleteUtilitaire(@PathVariable("id") int id) throws VehiculeException {
        ResponseEntity<String> re;
        try {
            utilitaireService.supprimer(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            utilitaireService.desactiver(id);
            re = ResponseEntity.status(HttpStatus.OK).build();
        }
        return re;
    }

    @GetMapping("/campingCars/{id}")
    public CampingCarDto getCampingCarById(@PathVariable("id") int id) {
        return campingCarService.getCampingCarById(id);
    }

    @GetMapping("/voitures/{id}")
    public VoitureDto getVoitureById(@PathVariable("id") int id) {
        return voitureService.getVoitureById(id);
    }

    @GetMapping("/motos/{id}")
    public MotoDto getMotoById(@PathVariable("id") int id) {
        return motoService.getMotoById(id);
    }

    @GetMapping("/velos/{id}")
    public VeloDto getVeloById(@PathVariable("id") int id) {
        return veloService.getVeloById(id);
    }

    @GetMapping("/utilitaires/{id}")
    public UtilitaireDto getUtilitaireById(@PathVariable("id") int id) {
        return utilitaireService.getUtilitaireById(id);
    }

    @GetMapping("/campingCars/{id}/desactiver")
    public void desactiverCampingCar(@PathVariable("id") int id) throws VehiculeException {
        campingCarService.desactiver(id);
    }

    @GetMapping("/voitures/{id}/desactiver")
    public void desactiverVoiture(@PathVariable("id") int id) throws VehiculeException {
        voitureService.desactiver(id);
    }

    @GetMapping("/motos/{id}/desactiver")
    public void desactiverMoto(@PathVariable("id") int id) throws VehiculeException {
        motoService.desactiver(id);
    }

    @GetMapping("/velos/{id}/desactiver")
    public void desactiverVelo(@PathVariable("id") int id) throws VehiculeException {
        veloService.desactiver(id);
    }

    @GetMapping("/utilitaires/{id}/desactiver")
    public void desactiverUtilitaire(@PathVariable("id") int id) throws VehiculeException {
        utilitaireService.desactiver(id);
    }

    @GetMapping("/campingCars/{id}/activer")
    public void activerCampingCar(@PathVariable("id") int id) throws VehiculeException {
        campingCarService.activer(id);
    }

    @GetMapping("/voitures/{id}/activer")
    public void activerVoiture(@PathVariable("id") int id) throws VehiculeException {
        voitureService.activer(id);
    }

    @GetMapping("/motos/{id}/activer")
    public void activerMoto(@PathVariable("id") int id) throws VehiculeException {
        motoService.activer(id);
    }

    @GetMapping("/velos/{id}/activer")
    public void activerVelo(@PathVariable("id") int id) throws VehiculeException {
        veloService.activer(id);
    }

    @GetMapping("/utilitaires/{id}/activer")
    public void activerUtilitaire(@PathVariable("id") int id) throws VehiculeException {
        utilitaireService.activer(id);
    }

    @GetMapping("/campingCars/{id}/retirer")
    public void retirerCampingCar(@PathVariable("id") int id) throws VehiculeException {
        campingCarService.retirerDuParc(id);
    }

    @GetMapping("/voitures/{id}/retirer")
    public void retirerVoiture(@PathVariable("id") int id) throws VehiculeException {
        voitureService.retirerDuParc(id);
    }

    @GetMapping("/motos/{id}/retirer")
    public void retirerMoto(@PathVariable("id") int id) throws VehiculeException {
        motoService.retirerDuParc(id);
    }

    @GetMapping("/velos/{id}/retirer")
    public void retirerVelo(@PathVariable("id") int id) throws VehiculeException {
        veloService.retirerDuParc(id);
    }

    @GetMapping("/utilitaires/{id}/retirer")
    public void retirerUtilitaire(@PathVariable("id") int id) throws VehiculeException {
        utilitaireService.retirerDuParc(id);
    }

    @GetMapping("/campingCars/{id}/remettre")
    public void remettreCampingCar(@PathVariable("id") int id) throws VehiculeException {
        campingCarService.remettreAuParc(id);
    }

    @GetMapping("/voitures/{id}/remettre")
    public void remettreVoiture(@PathVariable("id") int id) throws VehiculeException {
        voitureService.remettreAuParc(id);
    }

    @GetMapping("/motos/{id}/remettre")
    public void remettreMoto(@PathVariable("id") int id) throws VehiculeException {
        motoService.remettreAuParc(id);
    }

    @GetMapping("/velos/{id}/remettre")
    public void remettreVelo(@PathVariable("id") int id) throws VehiculeException {
        veloService.remettreAuParc(id);
    }

    @GetMapping("/utilitaires/{id}/remettre")
    public void remettreUtilitaire(@PathVariable("id") int id) throws VehiculeException {
        utilitaireService.remettreAuParc(id);
    }
}
