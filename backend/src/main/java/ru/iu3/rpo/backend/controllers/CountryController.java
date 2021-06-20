package ru.iu3.rpo.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.iu3.rpo.backend.models.Artist;
import ru.iu3.rpo.backend.models.Country;
import ru.iu3.rpo.backend.repositories.CountryRepository;
import ru.iu3.rpo.backend.tools.DataValidationException;

import java.util.*;
@CrossOrigin(origins="http://localhost:3000")

@RestController
@RequestMapping("/api/v1")
public class CountryController {
    @Autowired
    CountryRepository countryRepository;
    @GetMapping("/countries")
    public Page<Country> getAllCountries(@RequestParam("page") int page, @RequestParam("limit") int limit) {
       return countryRepository.findAll(PageRequest.of(page, limit, Sort.by(Sort.Direction.ASC, "name")));
    }

    @GetMapping("/countries/{id}")
    public ResponseEntity<Country> getCountry(@PathVariable(value = "id") Long countryId) throws DataValidationException{
        Country country = countryRepository.findById(countryId).orElseThrow(()->new DataValidationException("Counntry with this index can't be found"));
        return ResponseEntity.ok(country);
    }

    @GetMapping("/countries/{id}/artists")
    public ResponseEntity<List<Artist>> getArtistsCountry(@PathVariable(value="id") Long countryId){
        Optional<Country> currentCountry = countryRepository.findById(countryId);
        if(currentCountry.isPresent()){
            return ResponseEntity.ok(currentCountry.get().artists);
        }
        return ResponseEntity.ok(new ArrayList<Artist>());
    }

    @PostMapping("/countries")
    public ResponseEntity<Object> createCountry(@Validated @RequestBody Country country) throws DataValidationException {
        try{
            Country newCountry = countryRepository.save(country);
            return new ResponseEntity<Object>(newCountry, HttpStatus.OK);
        }
        catch(Exception ex){
            String error;
            if(ex.getMessage().contains("countries.name_UNIQUE"))
                throw new DataValidationException("country_already_exist");
            else if(ex.getMessage().contains("null"))
                throw new DataValidationException("country_is_required");
            else
                throw new DataValidationException("undefined_error");
        }
    }
    @PutMapping("/countries/{id}")
    public ResponseEntity<Country> updateCountry(@PathVariable(value = "id") Long countryId, @Validated @RequestBody Country countryDetails) throws DataValidationException {
        try{
            Country country = countryRepository.findById(countryId).orElseThrow(()-> new DataValidationException("This country does not exist"));
            country.name = countryDetails.name;
            countryRepository.save(country);
            return ResponseEntity.ok(country);
        }
        catch (Exception ex) {
            String error;
            if(ex.getMessage().contains("countries.name_UNIQUE"))
                throw new DataValidationException("country_already_exist");
            else if(ex.getMessage().contains("null"))
                throw new DataValidationException("country_is_required");
            else throw new DataValidationException("undefined_error");
        }
    }
    @PostMapping("/deletecountries")
    public ResponseEntity deleteCountries(@Validated @RequestBody List<Country> countries) {
        countryRepository.deleteAll(countries);
        return new ResponseEntity(HttpStatus.OK);
    }
}
