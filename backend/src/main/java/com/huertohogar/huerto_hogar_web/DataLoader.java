package com.huertohogar.huerto_hogar_web;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Initial data is now loaded via frontend importMockToApi script
        // Uncomment below only if needed for development without import script
    }
}
