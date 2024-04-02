package com.accenture.controller;

import com.accenture.exception.UtilisateurException;
import com.accenture.service.AdministrateurService;
import com.accenture.service.ClientService;
import com.accenture.service.dto.AdministrateurDto;
import com.accenture.service.dto.ClientDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class RootController {

    private final AdministrateurService administrateurService;
    private final ClientService clientService;
    private final PasswordEncoder passwordEncoder;

    private static final String USER_UNDEFINED = "Utilisateur non trouvé";
    private static final String WRONG_PASSWORD = "Mot de passe incorrect";

    @Autowired
    public RootController(AdministrateurService administrateurService, PasswordEncoder passwordEncoder, ClientService clientService) {
        this.administrateurService = administrateurService;
        this.passwordEncoder = passwordEncoder;
        this.clientService = clientService;

    }

    @GetMapping("/monCompte")
    ResponseEntity<?> getCompte(@RequestParam String email, @RequestParam String motDePasse) {
        AdministrateurDto administrateur = administrateurService.getAdministrateurByEmailIgnoreCase(email);
        ClientDto client = clientService.getClientByEmailIgnoreCase(email);

        if (administrateur == null && client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(USER_UNDEFINED);
        }

        if (administrateur != null) {
            if (passwordEncoder.matches(motDePasse, administrateur.motDePasse())) {
                return ResponseEntity.status(HttpStatus.OK).body(administrateurService.getAdministrateurByIdWithoutPassword(administrateur.id()));
            }
        } else {
            if (passwordEncoder.matches(motDePasse, client.motDePasse())) {
                return ResponseEntity.status(HttpStatus.OK).body(clientService.getClientByIdWithoutPassword(client.id()));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(WRONG_PASSWORD);
    }

    @DeleteMapping("/monCompte/supprimer")
    ResponseEntity<?> supprimerCompte(@RequestParam String email, @RequestParam String motDePasse) {
        AdministrateurDto administrateur = administrateurService.getAdministrateurByEmailIgnoreCase(email);
        ClientDto client = clientService.getClientByEmailIgnoreCase(email);

        if (administrateur == null && client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(USER_UNDEFINED);
        }

        if (administrateur != null) {
            if (passwordEncoder.matches(motDePasse, administrateur.motDePasse())) {
                administrateurService.supprimer(administrateur.id());
                return ResponseEntity.status(HttpStatus.OK).body("Administrateur supprimé");
            }
        } else {
            if (passwordEncoder.matches(motDePasse, client.motDePasse())) {
                clientService.supprimer(client.id());
                return ResponseEntity.status(HttpStatus.OK).body("Client supprimé");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(WRONG_PASSWORD);
    }


    @PutMapping("/monCompte/modifier")
    ResponseEntity<?> modifierCompte(@RequestParam String email, @RequestParam String motDePasse, @RequestBody AdministrateurDto administrateurDto) throws UtilisateurException {
        AdministrateurDto administrateur = administrateurService.getAdministrateurByEmailIgnoreCase(email);
        ClientDto client = clientService.getClientByEmailIgnoreCase(email);

        if (administrateur == null && client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(USER_UNDEFINED);
        }

        if (administrateur != null) {
            if (passwordEncoder.matches(motDePasse, administrateur.motDePasse())) {
                administrateurService.modifier(administrateurDto, administrateur.id());
                return ResponseEntity.status(HttpStatus.OK).body("Administrateur modifié");
            }
        } else {
            if (passwordEncoder.matches(motDePasse, client.motDePasse())) {
                clientService.modifier(client, client.id());
                return ResponseEntity.status(HttpStatus.OK).body("Client modifié");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(WRONG_PASSWORD);
    }
}

