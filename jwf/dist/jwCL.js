"use strict";
//Just works collision library
//All stolen from raylib
const jwCL = {
    checkCollisionRecs(rect1, rect2) {
        return (rect1.x < (rect2.x + rect2.w) && (rect1.x + rect1.w) > rect2.x) &&
            (rect1.y < (rect2.y + rect2.h) && (rect1.y + rect1.h) > rect2.y);
    },
    checkCollisionCircles(circle1, circle2) {
        let dx = circle2.x - circle1.x;
        let dy = circle2.y - circle1.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= (circle1.r + circle2.r);
    },
    checkCollisionCircleRec(center, rec) {
        let collision = false;
        let recCenterX = (rec.x + rec.w / 2.0);
        let recCenterY = (rec.y + rec.h / 2.0);
        let dx = Math.abs(center.x - recCenterX);
        let dy = Math.abs(center.y - recCenterY);
        if (dx > (rec.w / 2.0 + center.r)) {
            return false;
        }
        if (dy > (rec.h / 2.0 + center.r)) {
            return false;
        }
        if (dx <= (rec.w / 2.0)) {
            return true;
        }
        if (dy <= (rec.h / 2.0)) {
            return true;
        }
        let cornerDistanceSq = (dx - rec.w / 2.0) * (dx - rec.w / 2.0) +
            (dy - rec.h / 2.0) * (dy - rec.h / 2.0);
        collision = (cornerDistanceSq <= (center.r * center.r));
        return collision;
    },
    checkCollisionPointRec(point, rec) {
        return (point.x >= rec.x) && (point.x <= (rec.x + rec.w)) && (point.y >= rec.y) && (point.y <= (rec.y + rec.h));
    },
    checkCollisionPointCircle(point, circle) {
        return this.checkCollisionCircles({ x: point.x, y: point.y, r: 1 }, circle);
    },
    checkCollisionPointTriangle(point, triangle) {
        let p1 = triangle.p1;
        let p2 = triangle.p2;
        let p3 = triangle.p3;
        let alpha = ((p2.y - p3.y) * (point.x - p3.x) + (p3.x - p2.x) * (point.y - p3.y)) / ((p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y));
        let beta = ((p3.y - p1.y) * (point.x - p3.x) + (p1.x - p3.x) * (point.y - p3.y)) / ((p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y));
        let gamma = 1 - alpha - beta;
        return (alpha > 0) && (beta > 0) && (gamma > 0);
    },
    // checkCollisionLines(line1:ILine,line2:ILine){	},
    // checkCollisionPointLine(){},
};
