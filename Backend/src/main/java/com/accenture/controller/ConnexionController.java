package com.accenture.controller;

import com.accenture.service.dto.AdministrateurResponseDto;
import com.accenture.service.dto.ClientResponseDto;
import com.accenture.service.AdministrateurService;
import com.accenture.service.ClientService;
import com.accenture.service.dto.AdministrateurDto;
import com.accenture.service.dto.ClientDto;
import com.accenture.service.mapper.AdministrateurMapper;
import com.accenture.service.mapper.ClientMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/connexion")
@CrossOrigin(origins = "http://localhost:3000")
public class ConnexionController {

    private final AdministrateurService administrateurService;
    private final ClientService clientService;
    private final AdministrateurMapper administrateurMapper;
    private final ClientMapper clientMapper;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private ConnexionController(AdministrateurService administrateurService, ClientService clientService, AdministrateurMapper administrateurMapper, ClientMapper clientMapper, PasswordEncoder passwordEncoder) {
        this.administrateurService = administrateurService;
        this.clientService = clientService;
        this.administrateurMapper = administrateurMapper;
        this.passwordEncoder = passwordEncoder;
        this.clientMapper = clientMapper;
    }

    @PostMapping("/client")
    public ResponseEntity<ClientResponseDto> getUtilisateur(@RequestBody ClientDto loginClient) {
        String email = loginClient.email();
        String motDePasse = loginClient.motDePasse();

        ClientDto client = clientService.getClientByEmailIgnoreCaseAndMotDePasse(email, motDePasse);
        ResponseEntity<ClientResponseDto> re;
        if (client != null) {
            ClientResponseDto clientResponse = clientMapper.clientDtoToClientResponseDto(client);
            re = ResponseEntity.status(HttpStatus.OK).body(clientResponse);
        } else {
            re = ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return re;
    }


    @PostMapping("/admin")
    public ResponseEntity<AdministrateurResponseDto> getUtilisateur(@RequestBody AdministrateurDto loginAdministrateur) {
        String email = loginAdministrateur.email();
        String motDePasse = loginAdministrateur.motDePasse();

        AdministrateurDto administrateur = administrateurService.getAdministrateurByEmailIgnoreCaseAndMotDePasse(email, motDePasse);
        ResponseEntity<AdministrateurResponseDto> re;
        if (administrateur != null) {
            AdministrateurResponseDto administrateurResponse = administrateurMapper.administrateurDtoToAdministrateurResponseDto(administrateur);
            re = ResponseEntity.status(HttpStatus.OK).body(administrateurResponse);
        } else {
            re = ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return re;
    }

}
