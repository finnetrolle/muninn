package ru.trollsmedjan.muninn.controllers;

import org.springframework.data.geo.Point;
import org.springframework.data.geo.Polygon;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * Created by syachin on 14.05.2015.
 */
@RestController
@RequestMapping("/resource")
public class TestRestController {

    @RequestMapping
    public Map<String, Object> home() {
        Map<String, Object> model = new HashMap<>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello, World!");
        return model;
    }

    @RequestMapping("/polygon")
    public @ResponseBody
    Polygon testPolygon() {
        Polygon polygon = new Polygon(new Point(1, 2), new Point(3, 4), new Point(5, 6));
        return polygon;
    }


}
