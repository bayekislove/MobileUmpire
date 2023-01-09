export enum Point {
    ZERO, FIFTEEN, THIRTY, FORTY, AD, WON
};

export namespace Point {

export function addPoint(point : Point) : Point {
    return (point + 1) as Point;
};

export function pointToStr(point : Point) : string {
    switch (point) {
        case Point.ZERO:
            return " 0";

        case Point.FIFTEEN:
            return "15";
        
        case Point.THIRTY:
            return "30";

        case Point.FORTY:
            return "40";

        case Point.AD:
            return " A";
        
        default:
            return "  ";
    }
};

}

