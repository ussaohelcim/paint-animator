declare const jwML: {
    DEG2RAD: (deg: number) => number;
    RAD2DEG: (rad: number) => number;
    TAU: number;
    clamp(value: number, min: number, max: number): number;
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
    lerp(start: number, end: number, amount: number): number;
    /**
     * Normalize input value within input range
     */
    normalize(value: number, start: number, end: number): number;
    /**
     * Remap input value within input range to output range
     */
    remap(value: number, inputStart: number, inputEnd: number, outputStart: number, outputEnd: number): number;
    vector2Add(v1: IVec2, v2: IVec2): IVec2;
    vector2AddValue(v1: IVec2, value: number): IVec2;
    vector2Subtract(v1: IVec2, v2: IVec2): {
        x: number;
        y: number;
    };
    vector2SubtractValue(v: IVec2, value: number): {
        x: number;
        y: number;
    };
    /**
     * Also knows as magnitude
     */
    vector2Length(v: IVec2): number;
    vector2LengthSqrt(v: IVec2): number;
    /**
     * Calculate two vectors dot product. Useful to know if a vector is pointing to another vector.
     * `If == 1` v1 and v2 are pointing to same direction
     * `If > 0` v1 and v2 are pointing to each other
     * `If == 0` v1 and v2 are perpendicular. (Angle of 90 degrees)
     * `If < 0` v1 and v2 are pointing backwards. Ex `-1` means 180 degrees
     * @returns Number between [-1 and 1]
     */
    vector2DotProduct(v1: IVec2, v2: IVec2): number;
    /**
     * Calculate distance between two vectors
     */
    vector2Distance(v1: IVec2, v2: IVec2): number;
    vector2DistanceSqrt(v1: IVec2, v2: IVec2): void;
    /**
     * Calculate angle from two vectors
     */
    vector2Angle(v1: IVec2, v2: IVec2): number;
    vector2Scale(v: IVec2, scale: number): IVec2;
    vector2Multiply(v: IVec2, v2: IVec2): IVec2;
    vector2Negate(v: IVec2): IVec2;
    vector2Divide(v1: IVec2, v2: IVec2): {
        x: number;
        y: number;
    };
    vector2Normalize(v: IVec2): IVec2;
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
    vector2Lerp(v1: IVec2, v2: IVec2, amount: number): IVec2;
    vector2Reflect(v: IVec2, normal: IVec2): IVec2;
    vector2Rotate(v: IVec2, angle: number): {
        x: number;
        y: number;
    };
    vector2Invert(v: IVec2): {
        x: number;
        y: number;
    };
    /**
     * Clamp the components of the vector between
     * min and max values specified by the given vectors
     */
    vector2Clamp(v: IVec2, min: IVec2, max: IVec2): IVec2;
    AngleToNormalizedVector2(angle: number): IVec2;
    normalizedVector2ToAngle(v: IVec2): number;
    vec2(x: number, y: number): IVec2;
    /**
     * Useful to get the normal direction of a plane.
     */
    vector3CrossProduct(v1: IVec3, v2: IVec3): {
        x: number;
        y: number;
        z: number;
    };
};
declare interface IVec3 extends IVec2 {
    z: number;
}
