package com.cms.mapper;
import com.cms.dto.StationDto;
import com.cms.model.Officer;
import com.cms.model.Station;
import org.springframework.stereotype.Component;

@Component
public class StationMapper {

    public StationDto getDtoFromEntity(Station station, Officer officer) {
        return new StationDto(
                station.getId(),
                station.getStationTitle(),
                station.getStationHead().getName(),
                officer.getName()
        );

        /*public static IncidentStationDto  fromEntityToDto(Station station, Officer officer){

            return new IncidentStationDto(
                    station.getId(),
                    station.getStationTitle(),
                    station.getStationHead().getName(),
                    officer.getName()
            );*/
    }
}