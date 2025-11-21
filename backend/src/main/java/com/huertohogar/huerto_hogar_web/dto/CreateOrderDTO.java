package com.huertohogar.huerto_hogar_web.dto;

import java.math.BigDecimal;

public class CreateOrderDTO {
    public String nombre;
    public String apellidos;
    public String correo;
    public String calle;
    public String departamento;
    public String region;
    public String comuna;
    public String indicaciones;
    public BigDecimal total;
    public String codigo;
    public String estado;
    public Object items; // will be serialized to JSON

    // Getters/setters optional - using public fields for brevity
}
