package ru.trollsmedjan.muninn.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.trollsmedjan.muninn.model.Document;
import ru.trollsmedjan.muninn.model.PowerSource;
import ru.trollsmedjan.muninn.model.dao.DocumentDao;
import ru.trollsmedjan.muninn.model.dao.PowerSourceDao;

/**
 * Created by syachin on 14.05.2015.
 */
@RestController
@RequestMapping("/document/{powerSourceId}")
public class DocumentRestController {

    @Autowired
    private PowerSourceDao powerSourceDao;

    @Autowired
    private DocumentDao documentDao;

    @RequestMapping
    public @ResponseBody
    Iterable<Document> getDocuments(@PathVariable Long powerSourceId) {
        PowerSource powerSource = powerSourceDao.findOne(powerSourceId);
        return documentDao.findByPowerSource(powerSource);
    }


}
