"use strict";
//Just works math library for jwf
const jwML = {
    DEG2RAD: (deg) => deg * Math.PI / 180,
    RAD2DEG: (rad) => rad * 180 / Math.PI,
    TAU: Math.PI * 2,
    clamp(value, min, max) {
        let result = (value < min) ? min : max;
        result = result > max ? max : result;
        return result;
    },
    /**
     * Calculate linear interpolation between two numbers
     * ex:
     * ```js
     * lerp(0,1,0.5)
     * //0.5
     * ```
     * **NOT CLAMPED**
     * @returns
     */
    lerp(start, end, amount) {
        return start + amount * (end - start);
    },
    /**
     * Normalize input value within input range
     */
    normalize(value, start, end) {
        return (value - start) / (end - start);
    },
    /**
     * Remap input value within input range to output range
     */
    remap(value, inputStart, inputEnd, outputStart, outputEnd) {
        return (value - inputStart) / (inputEnd - inputStart) * (outputEnd - outputStart) + outputStart;
    },
    vector2Add(v1, v2) {
        return this.vec2(v1.x + v2.x, v1.y + v2.y);
    },
    vector2AddValue(v1, value) {
        return this.vec2(v1.x + value, v1.y + value);
    },
    vector2Subtract(v1, v2) {
        return { x: v1.x - v2.x, y: v1.y - v2.y };
    },
    vector2SubtractValue(v, value) {
        return { x: v.x - value, y: v.y - value };
    },
    /**
     * Also knows as magnitude
     */
    vector2Length(v) {
        return Math.sqrt((v.x * v.x) + (v.y * v.y));
    },
    vector2LengthSqrt(v) {
        return (v.x * v.x) + (v.y * v.y);
    },
    /**
     * Calculate two vectors dot product. Useful to know if a vector is pointing to another vector.
     * `If == 1` v1 and v2 are pointing to same direction
     * `If > 0` v1 and v2 are pointing to each other
     * `If == 0` v1 and v2 are perpendicular. (Angle of 90 degrees)
     * `If < 0` v1 and v2 are pointing backwards. Ex `-1` means 180 degrees
     * @returns Number between [-1 and 1]
     */
    vector2DotProduct(v1, v2) {
        return (v1.x * v2.x + v1.y * v2.y);
    },
    /**
     * Calculate distance between two vectors
     */
    vector2Distance(v1, v2) {
        return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
    },
    vector2DistanceSqrt(v1, v2) { },
    /**
     * Calculate angle from two vectors
     */
    vector2Angle(v1, v2) {
        return Math.atan2(v2.y - v1.y, v2.x - v1.x);
    },
    vector2Scale(v, scale) {
        return this.vec2(v.x * scale, v.y * scale);
    },
    vector2Multiply(v, v2) {
        return this.vec2(v.x * v2.x, v.y * v2.y);
    },
    vector2Negate(v) {
        return this.vec2(-v.x, -v.y);
    },
    vector2Divide(v1, v2) {
        return { x: v1.x / v2.x, y: v1.y / v2.y };
    },
    vector2Normalize(v) {
        let result = { x: 0, y: 0 };
        let len = Math.sqrt((v.x * v.x) + (v.y * v.y));
        if (len > 0) {
            let tlen = 1 / len;
            result.x = v.x * tlen;
            result.y = v.y * tlen;
        }
        return result;
    },
    /**
     * Calculate linear interpolation between two vectors
     * Ex:
     * ```js
     * v1 = {1,0}
     * v1 = {-1,0}
     * vector2Lerp(v1,v2,0.5)
     * //{0,0}
     * ```
     * **NOT CLAMPED**
     * @returns A vector between [v1 and v2]
     */
    vector2Lerp(v1, v2, amount) {
        let result = { x: 0, y: 0 };
        result.x = v1.x + amount * (v2.x - v1.x);
        result.y = v1.y + amount * (v2.y - v1.y);
        return result;
    },
    vector2Reflect(v, normal) {
        let result = { x: 0, y: 0 };
        let dotProduct = (v.x * normal.x + v.y * normal.y);
        result.x = v.x - (2.0 * normal.x) * dotProduct;
        result.y = v.y - (2.0 * normal.y) * dotProduct;
        return result;
    },
    vector2Rotate(v, angle) {
        let result = { x: 0, y: 0 };
        let cosres = Math.cos(angle);
        let sinres = Math.sin(angle);
        result.x = v.x * cosres - v.y * sinres;
        result.y = v.x * sinres + v.y * cosres;
        return result;
    },
    //vector2MoveTowards(){},
    vector2Invert(v) {
        return { x: 1 / v.x, y: 1 / v.y };
    },
    /**
     * Clamp the components of the vector between
     * min and max values specified by the given vectors
     */
    vector2Clamp(v, min, max) {
        return {
            x: Math.min(max.x, Math.max(min.x, v.x)),
            y: Math.min(max.y, Math.max(min.y, v.y))
        };
    },
    //vector2ClampValue(){},
    //vector2Equals(){},
    AngleToNormalizedVector2(angle) {
        return this.vec2(Math.cos(angle), Math.sin(angle));
    },
    normalizedVector2ToAngle(v) {
        return Math.atan2(v.y, v.x);
    },
    vec2(x, y) {
        return {
            x: x,
            y: y
        };
    },
    /**
     * Useful to get the normal direction of a plane.
     */
    vector3CrossProduct(v1, v2) {
        return {
            x: v1.y * v2.z - v1.z * v2.y,
            y: v1.z * v2.x - v1.x * v2.z,
            z: v1.x * v2.y - v1.y * v2.x
        };
    },
};
