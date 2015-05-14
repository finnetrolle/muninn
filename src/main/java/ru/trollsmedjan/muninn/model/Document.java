package ru.trollsmedjan.muninn.model;

import javax.persistence.*;

/**
 * Created by syachin on 14.05.2015.
 */
@Entity
@Table(name="documents")
public class Document {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    private String link;

    @ManyToOne
    private PowerSource powerSource;

    @ManyToOne
    private User uploadedBy;

    //==================================================================================================================
    //===============================               GENERATED METHODS               ====================================
    //==================================================================================================================


    @Override
    public String toString() {
        return "Document{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", link='" + link + '\'' +
                ", powerSource=" + powerSource +
                ", uploadedBy=" + uploadedBy +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Document)) return false;

        Document document = (Document) o;

        if (link != null ? !link.equals(document.link) : document.link != null) return false;
        if (name != null ? !name.equals(document.name) : document.name != null) return false;
        if (powerSource != null ? !powerSource.equals(document.powerSource) : document.powerSource != null)
            return false;
        if (uploadedBy != null ? !uploadedBy.equals(document.uploadedBy) : document.uploadedBy != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (link != null ? link.hashCode() : 0);
        result = 31 * result + (powerSource != null ? powerSource.hashCode() : 0);
        result = 31 * result + (uploadedBy != null ? uploadedBy.hashCode() : 0);
        return result;
    }

    public long getId() {

        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public PowerSource getPowerSource() {
        return powerSource;
    }

    public void setPowerSource(PowerSource powerSource) {
        this.powerSource = powerSource;
    }

    public User getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }
}
