/*thi table is created for many to many relationship of incident and suspect as we know 1 incident has many suspect and
1 suspect in many incident
we can add annotation in one of the table like @many to many and private List<Suspect> suspect but the drawback is we cant
add extra column
so we are creating a separate table called incident suspect and taking the foreign key of both and putting it as many to one relationship
*/
package com.cms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class IncidentSuspect {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private Incident incident;
    @ManyToOne
    private Suspect suspect;

    @Column(length=500)
    private String details;

    @CreationTimestamp
    private Instant createdAt;
}
