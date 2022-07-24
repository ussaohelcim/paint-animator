"use strict";
const __BLACK = { r: 0, g: 0, b: 0, a: 255 };
const jwf = (canvas) => {
    return {
        _canvas: canvas,
        gfx: canvas.getContext('2d'),
        drawPixel: function (pixel) {
            this.gfx?.beginPath();
            this.gfx?.fillRect(pixel.x, pixel.y, 1, 1);
        },
        drawLine: function (line, thick = 5, color = __BLACK) {
            this.gfx?.beginPath();
            this.gfx.lineWidth = thick;
            this.gfx?.moveTo(line.p1.x, line.p1.y);
            this.gfx?.lineTo(line.p2.x, line.p2.y);
            this._stroke(thick, color);
        },
        drawLineBezier(startPos, cp1, cp2, endPos, thick = 5, color) {
            this.gfx?.beginPath();
            this.gfx?.moveTo(startPos.x, startPos.y);
            this.gfx?.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, endPos.x, endPos.y);
            this._stroke(thick, color);
        },
        //#region Rectangle
        /**
         *
         * @param rect
         * @param color Optional
         */
        drawRect: function (rect, color = __BLACK) {
            this.gfx?.beginPath();
            this._fill(color);
            this.gfx?.fillRect(rect.x, rect.y, rect.w, rect.h);
        },
        drawRectangleLines: function (rect, color = __BLACK) {
            this.gfx?.beginPath();
            this.gfx?.rect(rect.x, rect.y, rect.w, rect.h);
            this._stroke(5, color);
            // this.gfx?.stroke()
        },
        //#endregion
        //#region Circle
        drawCircle: function (circle, color = __BLACK) {
            this.gfx?.beginPath();
            this.gfx?.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
            this._fill(color);
        },
        drawCircleLines: function (circle, color = __BLACK) {
            this.gfx?.beginPath();
            this.gfx?.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
            this._stroke(5, color);
        },
        /**
         * Draws an arc.
         * @param circle Circle shape
         * @param startAngle start angle in RADIANS
         * @param endAngle end angle in RADIANS
         * @param color
         */
        drawCircleSector: function (circle, startAngle, endAngle, color = __BLACK) {
            this.gfx?.beginPath();
            this.gfx?.arc(circle.x, circle.y, circle.r, startAngle, endAngle);
            this._fill(color);
        },
        //#endregion
        drawImage: function (pos, img) {
            this.gfx?.drawImage(img, pos.x, pos.y);
        },
        drawTriangle: function (triangle, color = __BLACK) {
            this.gfx?.beginPath();
            this.gfx?.moveTo(triangle.p1.x, triangle.p1.y);
            this.gfx?.lineTo(triangle.p2.x, triangle.p2.y);
            this.gfx?.lineTo(triangle.p3.x, triangle.p3.y);
            this.gfx?.lineTo(triangle.p1.x, triangle.p1.y);
            this._fill(color);
            this.gfx?.closePath();
        },
        clearBackground: function () {
            this.gfx?.clearRect(0, 0, canvas.width, canvas.height);
        },
        //#region Private functions
        //those functions below are supossed to only be used by the framework
        _colorToString(color) {
            return `rgba(${color.r},${color.g},${color.b},${color.a })`;
        },
        _fill(color) {
            this.gfx.fillStyle = this._colorToString(color);
            this.gfx.fill();
        },
        _stroke(stroke = 5, color) {
            if (color) {
                this.gfx.strokeStyle = this._colorToString(color);
            }
            this.gfx.lineWidth = stroke;
            this.gfx?.stroke();
        },
        //#endregion
    };
};
