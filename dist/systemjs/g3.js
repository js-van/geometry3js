System.register("types/Vector2d", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var g3Vector2d, IndexedVector2d, Vector2dConstant;
    return {
        setters: [],
        execute: function () {
            /**
             * "Normal" implementation of Vector2d, has .x and .y properties
             */
            g3Vector2d = class g3Vector2d {
                // implement methods for Array here
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                }
                toString() {
                    return "[" + this.x + "," + this.y + "]";
                }
                clone() {
                    return new g3Vector2d(this.x, this.y);
                }
                Length() {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                }
                LengthSquared() {
                    return this.x * this.x + this.y * this.y;
                }
                at(i) {
                    return (i == 0) ? this.x : this.y;
                }
                set(b) {
                    this.x = b.x;
                    this.y = b.y;
                    return this;
                }
                addv(b) {
                    this.x += b.x;
                    this.y += b.y;
                    return this;
                }
                subv(b) {
                    this.x -= b.x;
                    this.y -= b.y;
                    return this;
                }
                mulf(f) {
                    this.x *= f;
                    this.y *= f;
                    return this;
                }
                divf(f) {
                    this.x /= f;
                    this.y /= f;
                    return this;
                }
            };
            exports_1("g3Vector2d", g3Vector2d);
            /**
             * This is a Vector2d that provides an indexing interface,
             * ie v[0], v[1]. It does this by subclassing Array.
             * setter/getters are used to provide .x and .y.
             * This is *much* slower than a class with .x and .y properties, unfortunately.
             * However some algorithms are much easier to code with indices!!
             */
            IndexedVector2d = class IndexedVector2d extends Array {
                // implement methods for Array here
                constructor(x, y) {
                    super(2);
                    this[0] = x;
                    this[1] = y;
                }
                clone() {
                    return new IndexedVector2d(this[0], this[1]);
                }
                get x() {
                    return this[0];
                }
                set x(f) {
                    this[0] = f;
                }
                get y() {
                    return this[1];
                }
                set y(f) {
                    this[1] = f;
                }
                Length() {
                    return Math.sqrt(this[0] * this[0] + this[1] * this[1]);
                }
                LengthSquared() {
                    return this[0] * this[0] + this[1] * this[1];
                }
                at(i) {
                    return this[i];
                }
                set(b) {
                    this[0] = b.x;
                    this[1] = b.y;
                    return this;
                }
                addv(b) {
                    this[0] += b.x;
                    this[1] += b.y;
                    return this;
                }
                subv(b) {
                    this[0] -= b[0];
                    this[1] -= b[1];
                    return this;
                }
                mulf(f) {
                    this[0] *= f;
                    this[1] *= f;
                    return this;
                }
                divf(f) {
                    this[0] /= f;
                    this[1] /= f;
                    return this;
                }
            };
            exports_1("IndexedVector2d", IndexedVector2d);
            /**
             * This is a Vector2d to use for constants. unfortunately
             * javascript really doesn't support this kind of thing very well!
             * We throw exceptions so that hopefully you can find the problems in your code.
             */
            Vector2dConstant = class Vector2dConstant {
                // implement methods for Array here
                constructor(x, y) {
                    this.xx = x;
                    this.yy = y;
                }
                toString() {
                    return "[" + this.xx + "," + this.yy + "]";
                }
                clone() {
                    return new g3Vector2d(this.xx, this.yy);
                }
                get x() {
                    return this.xx;
                }
                set x(f) {
                    throw "called x= on constant!";
                }
                get y() {
                    return this.yy;
                }
                set y(f) {
                    throw "called y= on constant!";
                }
            };
            exports_1("Vector2dConstant", Vector2dConstant);
        }
    };
});
System.register("util/Constants", ["types/Vector2d", "types/AxisAlignedBox2d"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Vector2d_1, AxisAlignedBox2d_1, Constants;
    return {
        setters: [
            function (Vector2d_1_1) {
                Vector2d_1 = Vector2d_1_1;
            },
            function (AxisAlignedBox2d_1_1) {
                AxisAlignedBox2d_1 = AxisAlignedBox2d_1_1;
            }
        ],
        execute: function () {
            Constants = class Constants {
                static get AxisAlignedBox2d_Empty() {
                    return new AxisAlignedBox2d_1.g3AxisAlignedBox2d();
                }
            };
            Constants.MaxDouble = Number.MAX_VALUE;
            Constants.MinDouble = Number.MIN_VALUE;
            Constants.MaxInt = Number.MAX_SAFE_INTEGER;
            Constants.MinInt = Number.MIN_SAFE_INTEGER;
            Constants.Deg2Rad = (Math.PI / 180.0);
            Constants.Rad2Deg = (180.0 / Math.PI);
            Constants.TwoPI = 2.0 * Math.PI;
            Constants.HalfPI = 0.5 * Math.PI;
            Constants.ZeroTolerance = 1e-08;
            Constants.Epsilon = 2.2204460492503131e-016;
            Constants.Vector2d_Zero = new Vector2d_1.Vector2dConstant(0, 0);
            Constants.Vector2d_One = new Vector2d_1.Vector2dConstant(1, 1);
            Constants.Vector2d_AxisX = new Vector2d_1.Vector2dConstant(1, 0);
            Constants.Vector2d_AxisY = new Vector2d_1.Vector2dConstant(0, 1);
            Constants.Vector2d_Max = new Vector2d_1.Vector2dConstant(Constants.MaxDouble, Constants.MaxDouble);
            Constants.Vector2d_Min = new Vector2d_1.Vector2dConstant(Constants.MinDouble, Constants.MinDouble);
            exports_2("default", Constants);
        }
    };
});
System.register("util/MathUtil", ["util/Constants"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Constants_1, MathUtil;
    return {
        setters: [
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            }
        ],
        execute: function () {
            MathUtil = class MathUtil {
                static IsFinite(d) {
                    return Number.isFinite(d);
                }
                static EpsilonEqual(a, b, epsilon = Constants_1.default.Epsilon) {
                    return Math.abs(a - b) < epsilon;
                }
                static PrecisionEqual(a, b, digits) {
                    let shift = Math.pow(10, digits);
                    return Math.round(a * shift) == Math.round(b * shift);
                }
                static Clamp(f, low, high) {
                    return (f < low) ? low : (f > high) ? high : f;
                }
                static RangeClamp(fValue, fMinMaxValue) {
                    return this.Clamp(fValue, -Math.abs(fMinMaxValue), Math.abs(fMinMaxValue));
                }
                static SignedClamp(f, fMax) {
                    return this.Clamp(Math.abs(f), 0, fMax) * Math.sign(f);
                }
                static SignedClamp2(f, fMin, fMax) {
                    return this.Clamp(Math.abs(f), fMin, fMax) * Math.sign(f);
                }
                // clamps theta to angle interval [min,max]. should work for any theta,
                // regardless of cycles, however min & max values should be in range
                // [-360,360] and min < max
                static ClampAngleDeg(theta, min, max) {
                    // convert interval to center/extent - [c-e,c+e]
                    let c = (min + max) * 0.5;
                    let e = max - c;
                    // get rid of extra rotations
                    theta = theta % 360;
                    // shift to origin, then convert theta to +- 180
                    theta -= c;
                    if (theta < -180)
                        theta += 360;
                    else if (theta > 180)
                        theta -= 360;
                    // clamp to extent
                    if (theta < -e)
                        theta = -e;
                    else if (theta > e)
                        theta = e;
                    // shift back
                    return theta + c;
                }
                // for ((i++) % N)-type loops, but where we might be using (i--)
                static WrapSignedIndex(val, mod) {
                    while (val < 0)
                        val += mod;
                    return val % mod;
                }
                // there are fast approximations to this...
                static InvSqrt(f) {
                    return f / Math.sqrt(f);
                }
                // normal Atan2 returns in range [-pi,pi], this shifts to [0,2pi]
                static Atan2Positive(y, x) {
                    let theta = Math.atan2(y, x);
                    if (theta < 0)
                        theta = (2 * Math.PI) + theta;
                    return theta;
                }
                static Lerp(a, b, t) {
                    return (1 - t) * a + (t) * b;
                }
                // code adapted from http://softsurfer.com/Archive/algorithm_0103/algorithm_0103.htm
                //    Return: >0 for P2 left of the line through P0 and P1
                //            =0 for P2 on the line
                //            <0 for P2 right of the line
                static IsLeft(P0, P1, P2) {
                    return Math.sign(((P1.x - P0.x) * (P2.y - P0.y) - (P2.x - P0.x) * (P1.y - P0.y)));
                }
            };
            exports_3("default", MathUtil);
        }
    };
});
System.register("types/AxisAlignedBox2d", ["util/Constants", "g3", "util/MathUtil"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Constants_2, g3, MathUtil_1, g3AxisAlignedBox2d;
    return {
        setters: [
            function (Constants_2_1) {
                Constants_2 = Constants_2_1;
            },
            function (g3_1) {
                g3 = g3_1;
            },
            function (MathUtil_1_1) {
                MathUtil_1 = MathUtil_1_1;
            }
        ],
        execute: function () {
            g3AxisAlignedBox2d = class g3AxisAlignedBox2d {
                constructor(min = Constants_2.default.Vector2d_Max, max = Constants_2.default.Vector2d_Min) {
                    this.Min = min.clone();
                    this.Max = max.clone();
                }
                clone() {
                    return g3.AxisAlignedBox2d(this.Min, this.Max);
                }
                get Width() {
                    return this.Max.x - this.Min.x;
                }
                get Height() {
                    return this.Max.y - this.Min.y;
                }
                get Area() {
                    return (this.Max.x - this.Min.x) * (this.Max.y - this.Min.y);
                }
                get DiagonalLength() {
                    let dx = this.Max.x - this.Min.x;
                    let dy = this.Max.y - this.Min.y;
                    return Math.sqrt(dx * dx + dy * dy);
                }
                get MaxDim() {
                    return Math.max(this.Max.x - this.Min.x, this.Max.y - this.Min.y);
                }
                get Diagonal() {
                    return g3.Vector2d(this.Max.x - this.Min.x, this.Max.y - this.Min.y);
                }
                get Center() {
                    return g3.Vector2d(0.5 * (this.Max.x + this.Min.x), 0.5 * (this.Max.y + this.Min.y));
                }
                /** ccw from bottom-left, 0 == bottom-left, 1 = bottom-right, 2 == top-right, 3 == top-left */
                Corner(i) {
                    return g3.Vector2d((i % 3 == 0) ? this.Min.x : this.Max.x, (i < 2) ? this.Min.y : this.Max.y);
                }
                Expand(f) {
                    this.Min.x -= f;
                    this.Min.y -= f;
                    this.Max.x += f;
                    this.Max.y += f;
                }
                Contract(f) {
                    f = MathUtil_1.default.SignedClamp(this.MaxDim, f);
                    this.Expand(-f);
                }
                /** values are all added. this is a weird function... */
                Pad(left, right, bottom, top) {
                    this.Min.x += left;
                    this.Min.y += bottom;
                    this.Max.x += right;
                    this.Max.y += top;
                }
                Translate(v) {
                    this.Min.addv(v);
                    this.Max.addv(v);
                }
                ContainPoint(v) {
                    this.Min.x = Math.min(this.Min.x, v.x);
                    this.Min.y = Math.min(this.Min.y, v.y);
                    this.Max.x = Math.max(this.Max.x, v.x);
                    this.Max.y = Math.max(this.Max.y, v.y);
                }
                ContainBox(b) {
                    this.ContainPoint(b.Min);
                    this.ContainPoint(b.Max);
                }
                Intersect(box) {
                    let minx = Math.max(this.Min.x, box.Min.x);
                    let miny = Math.max(this.Min.y, box.Min.y);
                    let maxx = Math.min(this.Max.x, box.Max.x);
                    let maxy = Math.min(this.Max.y, box.Max.y);
                    let width = maxx - minx;
                    let height = maxy - miny;
                    return (height <= 0 || width <= 0) ? Constants_2.default.AxisAlignedBox2d_Empty :
                        g3.AxisAlignedBox2d(g3.Vector2d(minx, miny), g3.Vector2d(maxx, maxy));
                }
                ContainsPoint(v) {
                    return (this.Min.x < v.x) && (this.Min.y < v.y) && (this.Max.x > v.x) && (this.Max.y > v.y);
                }
                ContainsBox(box2) {
                    return this.ContainsPoint(box2.Min) && this.ContainsPoint(box2.Max);
                }
                Intersects(box) {
                    return !((box.Max.x < this.Min.x) || (box.Min.x > this.Max.x) || (box.Max.y < this.Min.y) || (box.Min.y > this.Max.y));
                }
                /** returns 0 if point is inside box */
                Distance(v) {
                    let cx = 0.5 * (this.Max.x + this.Min.x);
                    let cy = 0.5 * (this.Max.y + this.Min.y);
                    let dx = Math.abs(v.x - cx);
                    let dy = Math.abs(v.y - cy);
                    let fWidth = this.Max.x - this.Min.x;
                    let fHeight = this.Max.y - this.Min.y;
                    if (dx < fWidth && dy < fHeight) {
                        return 0.0;
                    }
                    else if (dx > fWidth && dy > fHeight) {
                        return Math.sqrt((dx - fWidth) * (dx - fWidth) + (dy - fHeight) * (dy - fHeight));
                    }
                    else if (dx > fWidth) {
                        return dx - fWidth;
                    }
                    else if (dy > fHeight) {
                        return dy - fHeight;
                    }
                    return 0.0;
                }
                toString() {
                    return "[" + this.Min.x + "," + this.Max.x + "][" + this.Min.y + "," + this.Max.y + "]";
                }
            };
            exports_4("g3AxisAlignedBox2d", g3AxisAlignedBox2d);
        }
    };
});
System.register("curve2/Polygon2d", ["util/MathUtil", "g3", "util/Constants"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var MathUtil_2, g3, Constants_3, g3Polygon2d;
    return {
        setters: [
            function (MathUtil_2_1) {
                MathUtil_2 = MathUtil_2_1;
            },
            function (g3_2) {
                g3 = g3_2;
            },
            function (Constants_3_1) {
                Constants_3 = Constants_3_1;
            }
        ],
        execute: function () {
            g3Polygon2d = class g3Polygon2d {
                constructor(count = 0) {
                    this.vertices = new Array(count);
                    this.Timestamp = 0;
                }
                clone() {
                    let p = new g3Polygon2d();
                    p.vertices = this.vertices.slice();
                    p.Timestamp = this.Timestamp;
                    return p;
                }
                get VertexCount() {
                    return this.vertices.length;
                }
                GetVertex(index) {
                    return this.vertices[index].clone();
                }
                SetVertex(index, value) {
                    let p = this.vertices[index];
                    p.x = value.x;
                    p.y = value.y;
                    this.Timestamp++;
                }
                get Start() {
                    return this.vertices[0].clone();
                }
                get End() {
                    return this.vertices[this.vertices.length - 1].clone();
                }
                get Bounds() {
                    if (this.vertices.length == 0) {
                        return Constants_3.default.AxisAlignedBox2d_Empty;
                    }
                    let box = g3.AxisAlignedBox2d(this.vertices[0], this.vertices[0]);
                    for (let i = 1; i < this.vertices.length; ++i) {
                        box.ContainPoint(this.vertices[i]);
                    }
                    return box;
                }
                AppendVertex(v) {
                    this.vertices.push(g3.Vector2d(v.x, v.y));
                    this.Timestamp++;
                }
                AppendArray(v) {
                    if (v.length % 2 != 0) {
                        throw "Polygon2d.Append: array size is not even";
                    }
                    let N = v.length / 2;
                    for (let i = 0; i < N; ++i) {
                        this.vertices.push(g3.Vector2d(v[2 * i], v[2 * i + 1]));
                    }
                    this.Timestamp++;
                }
                Reverse() {
                    this.vertices.reverse();
                    this.Timestamp++;
                }
                // GetTangent()
                // GetBounds()
                get SignedArea() {
                    let fArea = 0;
                    let N = this.vertices.length;
                    for (let i = 0; i < N; ++i) {
                        let j = (i + 1) % N;
                        let v1 = this.vertices[i];
                        let v2 = this.vertices[j];
                        fArea += v1.x * v2.y - v1.y * v2.x;
                    }
                    return fArea / 2;
                }
                get IsClockwise() {
                    return this.SignedArea < 0;
                }
                get Perimeter() {
                    let fPerim = 0;
                    let N = this.vertices.length;
                    for (let i = 0; i < N; ++i) {
                        let j = (i + 1) % N;
                        let dx = this.vertices[j].x - this.vertices[i].x;
                        let dy = this.vertices[j].y - this.vertices[i].y;
                        fPerim += Math.sqrt(dx * dx + dy * dy);
                    }
                    return fPerim;
                }
                ContainsPoint(vTest) {
                    let nWindingNumber = 0; // winding number counter
                    let N = this.vertices.length;
                    for (let i = 0; i < N; ++i) {
                        let iNext = (i + 1) % N;
                        if (this.vertices[i].y <= vTest.y) {
                            // start y <= P.y
                            if (this.vertices[iNext].y > vTest.y) {
                                if (MathUtil_2.default.IsLeft(this.vertices[i], this.vertices[iNext], vTest) > 0)
                                    ++nWindingNumber; // have a valid up intersect
                            }
                        }
                        else {
                            // start y > P.y (no test needed)
                            if (this.vertices[iNext].y <= vTest.y) {
                                if (MathUtil_2.default.IsLeft(this.vertices[i], this.vertices[iNext], vTest) < 0)
                                    --nWindingNumber; // have a valid down intersect
                            }
                        }
                    }
                    return nWindingNumber != 0;
                }
            };
            exports_5("g3Polygon2d", g3Polygon2d);
        }
    };
});
System.register("curve2/GeneralPolygon2d", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var g3GeneralPolygon2d;
    return {
        setters: [],
        execute: function () {
            g3GeneralPolygon2d = class g3GeneralPolygon2d {
                constructor() {
                    this.outer = null;
                    this.OuterIsClockwise = false;
                    this.Holes = [];
                }
                get Outer() {
                    return this.outer;
                }
                set Outer(p) {
                    this.outer = p;
                    this.OuterIsClockwise = p.IsClockwise;
                }
                AddHole(hole, bCheck = true) {
                    if (this.outer == null)
                        throw "GeneralPolygon2d.AddHole: outer polygon not set!";
                    // need to implement these functions
                    // if ( bCheck ) {
                    //     if ( this.outer.Contains(hole) == false )
                    //         throw "GeneralPolygon2d.AddHole: outer does not contain hole!";
                    //     // [RMS] segment/segment intersection broken?
                    //     for ( let hole1 in this.holes ) {
                    //         if ( hole.Intersects(hole2) )
                    //             throw "GeneralPolygon2D.AddHole: new hole intersects existing hole!";
                    //     }
                    // }
                    let holecw = hole.IsClockwise;
                    if (this.OuterIsClockwise == holecw)
                        throw "GeneralPolygon2D.AddHole: new hole has same orientation as outer polygon!";
                    this.Holes.push(hole);
                }
                get HasHoles() {
                    return this.Holes.length > 0;
                }
                get Area() {
                    let sign = (this.OuterIsClockwise) ? -1.0 : 1.0;
                    let dArea = sign * this.outer.SignedArea;
                    for (let i = 0; i < this.Holes.length; ++i) {
                        dArea += sign * this.Holes[i].SignedArea;
                    }
                    return dArea;
                }
                get Perimeter() {
                    let perim = this.outer.Perimeter;
                    for (let i = 0; i < this.Holes.length; ++i) {
                        perim += this.Holes[i].Perimeter;
                    }
                    return perim;
                }
                get Bounds() {
                    let box = this.outer.Bounds;
                    for (let i = 0; i < this.Holes.length; ++i) {
                        box.ContainBox(this.Holes[i].Bounds);
                    }
                    return box;
                }
            };
            exports_6("g3GeneralPolygon2d", g3GeneralPolygon2d);
        }
    };
});
System.register("g3", ["types/Vector2d", "types/AxisAlignedBox2d", "curve2/Polygon2d", "curve2/GeneralPolygon2d", "util/Constants"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    /*
     * Type factories
     */
    function Vector2d(x, y) {
        return new Vector2d_2.g3Vector2d(x, y);
    }
    exports_7("Vector2d", Vector2d);
    function Vector2dIndexable(x, y) {
        return new Vector2d_2.IndexedVector2d(x, y);
    }
    exports_7("Vector2dIndexable", Vector2dIndexable);
    function AxisAlignedBox2d(min = Constants_4.default.Vector2d_Max, max = Constants_4.default.Vector2d_Min) {
        return new AxisAlignedBox2d_2.g3AxisAlignedBox2d(min, max);
    }
    exports_7("AxisAlignedBox2d", AxisAlignedBox2d);
    function Polygon2d(n = 0) {
        return new Polygon2d_1.g3Polygon2d(n);
    }
    exports_7("Polygon2d", Polygon2d);
    function GeneralPolygon2d() {
        return new GeneralPolygon2d_1.g3GeneralPolygon2d();
    }
    exports_7("GeneralPolygon2d", GeneralPolygon2d);
    /*
     * top-level math functions
     */
    function addv2(a, b) {
        return new Vector2d_2.g3Vector2d(a.x + b.x, a.y + b.y);
    }
    exports_7("addv2", addv2);
    function addv(a, b) {
        return a.clone().addv(b);
    }
    exports_7("addv", addv);
    var Vector2d_2, AxisAlignedBox2d_2, Polygon2d_1, GeneralPolygon2d_1, Constants_4;
    return {
        setters: [
            function (Vector2d_2_1) {
                Vector2d_2 = Vector2d_2_1;
            },
            function (AxisAlignedBox2d_2_1) {
                AxisAlignedBox2d_2 = AxisAlignedBox2d_2_1;
            },
            function (Polygon2d_1_1) {
                Polygon2d_1 = Polygon2d_1_1;
            },
            function (GeneralPolygon2d_1_1) {
                GeneralPolygon2d_1 = GeneralPolygon2d_1_1;
            },
            function (Constants_4_1) {
                Constants_4 = Constants_4_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=g3.js.map