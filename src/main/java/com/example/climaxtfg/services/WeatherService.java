
package com.example.climaxtfg.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class WeatherService {

    @Value("${weatherapi.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getWeatherForCity(String city) {
        try {
            String url = UriComponentsBuilder
                    .fromHttpUrl("https://api.weatherapi.com/v1/forecast.json")
                    .queryParam("key", apiKey)
                    .queryParam("q", city)
                    .queryParam("days", 14)
                    .queryParam("lang", "es")
                    .queryParam("aqi", "yes")
                    .queryParam("alerts", "no")
                    .toUriString();

            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            return "{\"error\": \"No se pudo obtener el clima: " + e.getMessage() + "\"}";
        }
    }
}