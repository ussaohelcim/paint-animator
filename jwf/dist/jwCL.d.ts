declare const jwCL: {
    checkCollisionRecs(rect1: IRect, rect2: IRect): boolean;
    checkCollisionCircles(circle1: ICircle, circle2: ICircle): boolean;
    checkCollisionCircleRec(center: ICircle, rec: IRect): boolean;
    checkCollisionPointRec(point: IVec2, rec: IRect): boolean;
    checkCollisionPointCircle(point: IVec2, circle: ICircle): boolean;
    checkCollisionPointTriangle(point: IVec2, triangle: ITriangle): boolean;
};
