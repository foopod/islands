/**
 * three-voxel-loader v1.2.2
 * https://github.com/andstor/three-voxel-loader
 * @author André Storhaug <andr3.storhaug@gmail.com>
 * @copyright 2020 André Storhaug
 * @license MIT
 * @version 1.2.2
 * @build Tue Apr 28 2020
 */
 import { FileLoader, Vector3 as Vector3$1, Loader, Matrix4, MeshPhongMaterial, VertexColors, Geometry, BoxGeometry, Color, BufferGeometry, Mesh } from './three.module.js';

 function _classCallCheck(instance, Constructor) {
   if (!(instance instanceof Constructor)) {
     throw new TypeError("Cannot call a class as a function");
   }
 }
 
 function _defineProperties(target, props) {
   for (var i = 0; i < props.length; i++) {
     var descriptor = props[i];
     descriptor.enumerable = descriptor.enumerable || false;
     descriptor.configurable = true;
     if ("value" in descriptor) descriptor.writable = true;
     Object.defineProperty(target, descriptor.key, descriptor);
   }
 }
 
 function _createClass(Constructor, protoProps, staticProps) {
   if (protoProps) _defineProperties(Constructor.prototype, protoProps);
   if (staticProps) _defineProperties(Constructor, staticProps);
   return Constructor;
 }
 
 function _inherits(subClass, superClass) {
   if (typeof superClass !== "function" && superClass !== null) {
     throw new TypeError("Super expression must either be null or a function");
   }
 
   subClass.prototype = Object.create(superClass && superClass.prototype, {
     constructor: {
       value: subClass,
       writable: true,
       configurable: true
     }
   });
   if (superClass) _setPrototypeOf(subClass, superClass);
 }
 
 function _getPrototypeOf(o) {
   _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
     return o.__proto__ || Object.getPrototypeOf(o);
   };
   return _getPrototypeOf(o);
 }
 
 function _setPrototypeOf(o, p) {
   _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
     o.__proto__ = p;
     return o;
   };
 
   return _setPrototypeOf(o, p);
 }
 
 function _isNativeReflectConstruct() {
   if (typeof Reflect === "undefined" || !Reflect.construct) return false;
   if (Reflect.construct.sham) return false;
   if (typeof Proxy === "function") return true;
 
   try {
     Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
     return true;
   } catch (e) {
     return false;
   }
 }
 
 function _assertThisInitialized(self) {
   if (self === void 0) {
     throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
   }
 
   return self;
 }
 
 function _possibleConstructorReturn(self, call) {
   if (call && (typeof call === "object" || typeof call === "function")) {
     return call;
   }
 
   return _assertThisInitialized(self);
 }
 
 function _createSuper(Derived) {
   return function () {
     var Super = _getPrototypeOf(Derived),
         result;
 
     if (_isNativeReflectConstruct()) {
       var NewTarget = _getPrototypeOf(this).constructor;
 
       result = Reflect.construct(Super, arguments, NewTarget);
     } else {
       result = Super.apply(this, arguments);
     }
 
     return _possibleConstructorReturn(this, result);
   };
 }
 
 function _unsupportedIterableToArray(o, minLen) {
   if (!o) return;
   if (typeof o === "string") return _arrayLikeToArray(o, minLen);
   var n = Object.prototype.toString.call(o).slice(8, -1);
   if (n === "Object" && o.constructor) n = o.constructor.name;
   if (n === "Map" || n === "Set") return Array.from(n);
   if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
 }
 
 function _arrayLikeToArray(arr, len) {
   if (len == null || len > arr.length) len = arr.length;
 
   for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
 
   return arr2;
 }
 
 function _createForOfIteratorHelper(o) {
   if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
     if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
       var i = 0;
 
       var F = function () {};
 
       return {
         s: F,
         n: function () {
           if (i >= o.length) return {
             done: true
           };
           return {
             done: false,
             value: o[i++]
           };
         },
         e: function (e) {
           throw e;
         },
         f: F
       };
     }
 
     throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
   }
 
   var it,
       normalCompletion = true,
       didErr = false,
       err;
   return {
     s: function () {
       it = o[Symbol.iterator]();
     },
     n: function () {
       var step = it.next();
       normalCompletion = step.done;
       return step;
     },
     e: function (e) {
       didErr = true;
       err = e;
     },
     f: function () {
       try {
         if (!normalCompletion && it.return != null) it.return();
       } finally {
         if (didErr) throw err;
       }
     }
   };
 }
 
 const getAllProperties = object => {
   const properties = new Set();
 
   do {
     for (const key of Reflect.ownKeys(object)) {
       properties.add([object, key]);
     }
   } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
 
   return properties;
 };
 
 var autoBind = (self, {
   include,
   exclude
 } = {}) => {
   const filter = key => {
     const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);
 
     if (include) {
       return include.some(match);
     }
 
     if (exclude) {
       return !exclude.some(match);
     }
 
     return true;
   };
 
   for (const [object, key] of getAllProperties(self.constructor.prototype)) {
     if (key === 'constructor' || !filter(key)) {
       continue;
     }
 
     const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
 
     if (descriptor && typeof descriptor.value === 'function') {
       self[key] = self[key].bind(self);
     }
   }
 
   return self;
 };
 
 /**
  * math-ds v1.1.4 build Thu Jan 23 2020
  * https://github.com/vanruesc/math-ds
  * Copyright 2020 Raoul van Rüschen
  * @license Zlib
  */
 
 /**
  * A vector with three components.
  */
 class Vector3 {
   /**
    * Constructs a new vector.
    *
    * @param {Number} [x=0] - The X component.
    * @param {Number} [y=0] - The Y component.
    * @param {Number} [z=0] - The Z component.
    */
   constructor(x = 0, y = 0, z = 0) {
     /**
      * The X component.
      *
      * @type {Number}
      */
     this.x = x;
     /**
      * The Y component.
      *
      * @type {Number}
      */
 
     this.y = y;
     /**
      * The Z component.
      *
      * @type {Number}
      */
 
     this.z = z;
   }
   /**
    * Sets the values of this vector
    *
    * @param {Number} x - The X component.
    * @param {Number} y - The Y component.
    * @param {Number} z - The Z component.
    * @return {Vector3} This vector.
    */
 
 
   set(x, y, z) {
     this.x = x;
     this.y = y;
     this.z = z;
     return this;
   }
   /**
    * Copies the values of another vector.
    *
    * @param {Vector3} v - A vector.
    * @return {Vector3} This vector.
    */
 
 
   copy(v) {
     this.x = v.x;
     this.y = v.y;
     this.z = v.z;
     return this;
   }
   /**
    * Clones this vector.
    *
    * @return {Vector3} A clone of this vector.
    */
 
 
   clone() {
     return new this.constructor(this.x, this.y, this.z);
   }
   /**
    * Copies values from an array.
    *
    * @param {Number[]} array - An array.
    * @param {Number} offset - An offset.
    * @return {Vector3} This vector.
    */
 
 
   fromArray(array, offset = 0) {
     this.x = array[offset];
     this.y = array[offset + 1];
     this.z = array[offset + 2];
     return this;
   }
   /**
    * Stores this vector in an array.
    *
    * @param {Array} [array] - A target array.
    * @param {Number} offset - An offset.
    * @return {Number[]} The array.
    */
 
 
   toArray(array = [], offset = 0) {
     array[offset] = this.x;
     array[offset + 1] = this.y;
     array[offset + 2] = this.z;
     return array;
   }
   /**
    * Sets the values of this vector based on a spherical description.
    *
    * @param {Spherical} s - A spherical description.
    * @return {Vector3} This vector.
    */
 
 
   setFromSpherical(s) {
     return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
   }
   /**
    * Sets the values of this vector based on spherical coordinates.
    *
    * @param {Number} radius - The radius.
    * @param {Number} phi - The polar angle.
    * @param {Number} theta - The angle around the equator of the sphere.
    * @return {Vector3} This vector.
    */
 
 
   setFromSphericalCoords(radius, phi, theta) {
     const sinPhiRadius = Math.sin(phi) * radius;
     this.x = sinPhiRadius * Math.sin(theta);
     this.y = Math.cos(phi) * radius;
     this.z = sinPhiRadius * Math.cos(theta);
     return this;
   }
   /**
    * Sets the values of this vector based on a cylindrical description.
    *
    * @param {Cylindrical} c - A cylindrical description.
    * @return {Vector3} This vector.
    */
 
 
   setFromCylindrical(c) {
     return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
   }
   /**
    * Sets the values of this vector based on cylindrical coordinates.
    *
    * @param {Number} radius - The radius.
    * @param {Number} theta - Theta.
    * @param {Number} y - The height.
    * @return {Vector3} This vector.
    */
 
 
   setFromCylindricalCoords(radius, theta, y) {
     this.x = radius * Math.sin(theta);
     this.y = y;
     this.z = radius * Math.cos(theta);
     return this;
   }
   /**
    * Copies the values of a matrix column.
    *
    * @param {Matrix4} m - A 3x3 matrix.
    * @param {Number} index - A column index of the range [0, 2].
    * @return {Vector3} This vector.
    */
 
 
   setFromMatrix3Column(m, index) {
     return this.fromArray(m.elements, index * 3);
   }
   /**
    * Copies the values of a matrix column.
    *
    * @param {Matrix4} m - A 4x4 matrix.
    * @param {Number} index - A column index of the range [0, 3].
    * @return {Vector3} This vector.
    */
 
 
   setFromMatrixColumn(m, index) {
     return this.fromArray(m.elements, index * 4);
   }
   /**
    * Extracts the position from a matrix.
    *
    * @param {Matrix4} m - A 4x4 matrix.
    * @return {Vector3} This vector.
    */
 
 
   setFromMatrixPosition(m) {
     const me = m.elements;
     this.x = me[12];
     this.y = me[13];
     this.z = me[14];
     return this;
   }
   /**
    * Extracts the scale from a matrix.
    *
    * @param {Matrix4} m - A 4x4 matrix.
    * @return {Vector3} This vector.
    */
 
 
   setFromMatrixScale(m) {
     const sx = this.setFromMatrixColumn(m, 0).length();
     const sy = this.setFromMatrixColumn(m, 1).length();
     const sz = this.setFromMatrixColumn(m, 2).length();
     this.x = sx;
     this.y = sy;
     this.z = sz;
     return this;
   }
   /**
    * Adds a vector to this one.
    *
    * @param {Vector3} v - The vector to add.
    * @return {Vector3} This vector.
    */
 
 
   add(v) {
     this.x += v.x;
     this.y += v.y;
     this.z += v.z;
     return this;
   }
   /**
    * Adds a scalar to this vector.
    *
    * @param {Number} s - The scalar to add.
    * @return {Vector3} This vector.
    */
 
 
   addScalar(s) {
     this.x += s;
     this.y += s;
     this.z += s;
     return this;
   }
   /**
    * Sets this vector to the sum of two given vectors.
    *
    * @param {Vector3} a - A vector.
    * @param {Vector3} b - Another vector.
    * @return {Vector3} This vector.
    */
 
 
   addVectors(a, b) {
     this.x = a.x + b.x;
     this.y = a.y + b.y;
     this.z = a.z + b.z;
     return this;
   }
   /**
    * Adds a scaled vector to this one.
    *
    * @param {Vector3} v - The vector to scale and add.
    * @param {Number} s - A scalar.
    * @return {Vector3} This vector.
    */
 
 
   addScaledVector(v, s) {
     this.x += v.x * s;
     this.y += v.y * s;
     this.z += v.z * s;
     return this;
   }
   /**
    * Subtracts a vector from this vector.
    *
    * @param {Vector3} v - The vector to subtract.
    * @return {Vector3} This vector.
    */
 
 
   sub(v) {
     this.x -= v.x;
     this.y -= v.y;
     this.z -= v.z;
     return this;
   }
   /**
    * Subtracts a scalar from this vector.
    *
    * @param {Number} s - The scalar to subtract.
    * @return {Vector3} This vector.
    */
 
 
   subScalar(s) {
     this.x -= s;
     this.y -= s;
     this.z -= s;
     return this;
   }
   /**
    * Sets this vector to the difference between two given vectors.
    *
    * @param {Vector3} a - A vector.
    * @param {Vector3} b - A second vector.
    * @return {Vector3} This vector.
    */
 
 
   subVectors(a, b) {
     this.x = a.x - b.x;
     this.y = a.y - b.y;
     this.z = a.z - b.z;
     return this;
   }
   /**
    * Multiplies this vector with another vector.
    *
    * @param {Vector3} v - A vector.
    * @return {Vector3} This vector.
    */
 
 
   multiply(v) {
     this.x *= v.x;
     this.y *= v.y;
     this.z *= v.z;
     return this;
   }
   /**
    * Multiplies this vector with a given scalar.
    *
    * @param {Number} s - A scalar.
    * @return {Vector3} This vector.
    */
 
 
   multiplyScalar(s) {
     this.x *= s;
     this.y *= s;
     this.z *= s;
     return this;
   }
   /**
    * Sets this vector to the product of two given vectors.
    *
    * @param {Vector3} a - A vector.
    * @param {Vector3} b - Another vector.
    * @return {Vector3} This vector.
    */
 
 
   multiplyVectors(a, b) {
     this.x = a.x * b.x;
     this.y = a.y * b.y;
     this.z = a.z * b.z;
     return this;
   }
   /**
    * Divides this vector by another vector.
    *
    * @param {Vector3} v - A vector.
    * @return {Vector3} This vector.
    */
 
 
   divide(v) {
     this.x /= v.x;
     this.y /= v.y;
     this.z /= v.z;
     return this;
   }
   /**
    * Divides this vector by a given scalar.
    *
    * @param {Number} s - A scalar.
    * @return {Vector3} This vector.
    */
 
 
   divideScalar(s) {
     this.x /= s;
     this.y /= s;
     this.z /= s;
     return this;
   }
   /**
    * Sets this vector to the cross product of the given vectors.
    *
    * @param {Vector3} a - A vector.
    * @param {Vector3} b - Another vector.
    * @return {Vector3} This vector.
    */
 
 
   crossVectors(a, b) {
     const ax = a.x,
           ay = a.y,
           az = a.z;
     const bx = b.x,
           by = b.y,
           bz = b.z;
     this.x = ay * bz - az * by;
     this.y = az * bx - ax * bz;
     this.z = ax * by - ay * bx;
     return this;
   }
   /**
    * Calculates the cross product of this vector and the given one.
    *
    * @param {Vector3} v - A vector.
    * @return {Vector3} This vector.
    */
 
 
   cross(v) {
     return this.crossVectors(this, v);
   }
   /**
    * Applies a matrix to this direction vector.
    *
    * @param {Matrix4} m - A matrix.
    * @return {Vector3} This vector.
    */
 
 
   transformDirection(m) {
     const x = this.x,
           y = this.y,
           z = this.z;
     const e = m.elements;
     this.x = e[0] * x + e[4] * y + e[8] * z;
     this.y = e[1] * x + e[5] * y + e[9] * z;
     this.z = e[2] * x + e[6] * y + e[10] * z;
     return this.normalize();
   }
   /**
    * Applies a matrix to this vector.
    *
    * @param {Matrix3} m - A matrix.
    * @return {Vector3} This vector.
    */
 
 
   applyMatrix3(m) {
     const x = this.x,
           y = this.y,
           z = this.z;
     const e = m.elements;
     this.x = e[0] * x + e[3] * y + e[6] * z;
     this.y = e[1] * x + e[4] * y + e[7] * z;
     this.z = e[2] * x + e[5] * y + e[8] * z;
     return this;
   }
   /**
    * Applies a normal matrix to this vector and normalizes it.
    *
    * @param {Matrix3} m - A normal matrix.
    * @return {Vector3} This vector.
    */
 
 
   applyNormalMatrix(m) {
     return this.applyMatrix3(m).normalize();
   }
   /**
    * Applies a matrix to this vector.
    *
    * @param {Matrix4} m - A matrix.
    * @return {Vector3} This vector.
    */
 
 
   applyMatrix4(m) {
     const x = this.x,
           y = this.y,
           z = this.z;
     const e = m.elements;
     this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
     this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
     this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
     return this;
   }
   /**
    * Applies a quaternion to this vector.
    *
    * @param {Quaternion} q - A quaternion.
    * @return {Vector3} This vector.
    */
 
 
   applyQuaternion(q) {
     const x = this.x,
           y = this.y,
           z = this.z;
     const qx = q.x,
           qy = q.y,
           qz = q.z,
           qw = q.w; // Calculate: quaternion * vector.
 
     const ix = qw * x + qy * z - qz * y;
     const iy = qw * y + qz * x - qx * z;
     const iz = qw * z + qx * y - qy * x;
     const iw = -qx * x - qy * y - qz * z; // Calculate: result * inverse quaternion.
 
     this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
     this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
     this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
     return this;
   }
   /**
    * Negates this vector.
    *
    * @return {Vector3} This vector.
    */
 
 
   negate() {
     this.x = -this.x;
     this.y = -this.y;
     this.z = -this.z;
     return this;
   }
   /**
    * Calculates the dot product with another vector.
    *
    * @param {Vector3} v - A vector.
    * @return {Number} The dot product.
    */
 
 
   dot(v) {
     return this.x * v.x + this.y * v.y + this.z * v.z;
   }
   /**
    * Reflects this vector. The given plane normal is assumed to be normalized.
    *
    * @param {Vector3} n - A normal.
    * @return {Vector3} This vector.
    */
 
 
   reflect(n) {
     const nx = n.x;
     const ny = n.y;
     const nz = n.z;
     this.sub(n.multiplyScalar(2 * this.dot(n))); // Restore the normal.
 
     n.set(nx, ny, nz);
     return this;
   }
   /**
    * Computes the angle to the given vector.
    *
    * @param {Vector3} v - A vector.
    * @return {Number} The angle in radians.
    */
 
 
   angleTo(v) {
     const theta = this.dot(v) / Math.sqrt(this.lengthSquared() * v.lengthSquared()); // Clamp to avoid numerical problems.
 
     return Math.acos(Math.min(Math.max(theta, -1), 1));
   }
   /**
    * Calculates the Manhattan length of this vector.
    *
    * @return {Number} The length.
    */
 
 
   manhattanLength() {
     return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
   }
   /**
    * Calculates the squared length of this vector.
    *
    * @return {Number} The squared length.
    */
 
 
   lengthSquared() {
     return this.x * this.x + this.y * this.y + this.z * this.z;
   }
   /**
    * Calculates the length of this vector.
    *
    * @return {Number} The length.
    */
 
 
   length() {
     return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
   }
   /**
    * Calculates the Manhattan distance to a given vector.
    *
    * @param {Vector3} v - A vector.
    * @return {Number} The distance.
    */
 
 
   manhattanDistanceTo(v) {
     return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
   }
   /**
    * Calculates the squared distance to a given vector.
    *
    * @param {Vector3} v - A vector.
    * @return {Number} The squared distance.
    */
 
 
   distanceToSquared(v) {
     const dx = this.x - v.x;
     const dy = this.y - v.y;
     const dz = this.z - v.z;
     return dx * dx + dy * dy + dz * dz;
   }
   /**
    * Calculates the distance to a given vector.
    *
    * @param {Vector3} v - A vector.
    * @return {Number} The distance.
    */
 
 
   distanceTo(v) {
     return Math.sqrt(this.distanceToSquared(v));
   }
   /**
    * Normalizes this vector.
    *
    * @return {Vector3} This vector.
    */
 
 
   normalize() {
     return this.divideScalar(this.length());
   }
   /**
    * Sets the length of this vector.
    *
    * @param {Number} length - The new length.
    * @return {Vector3} This vector.
    */
 
 
   setLength(length) {
     return this.normalize().multiplyScalar(length);
   }
   /**
    * Adopts the min value for each component of this vector and the given one.
    *
    * @param {Vector3} v - A vector.
    * @return {Vector3} This vector.
    */
 
 
   min(v) {
     this.x = Math.min(this.x, v.x);
     this.y = Math.min(this.y, v.y);
     this.z = Math.min(this.z, v.z);
     return this;
   }
   /**
    * Adopts the max value for each component of this vector and the given one.
    *
    * @param {Vector3} v - A vector.
    * @return {Vector3} This vector.
    */
 
 
   max(v) {
     this.x = Math.max(this.x, v.x);
     this.y = Math.max(this.y, v.y);
     this.z = Math.max(this.z, v.z);
     return this;
   }
   /**
    * Clamps this vector.
    *
    * @param {Vector3} min - The lower bounds. Assumed to be smaller than max.
    * @param {Vector3} max - The upper bounds. Assumed to be greater than min.
    * @return {Vector3} This vector.
    */
 
 
   clamp(min, max) {
     this.x = Math.max(min.x, Math.min(max.x, this.x));
     this.y = Math.max(min.y, Math.min(max.y, this.y));
     this.z = Math.max(min.z, Math.min(max.z, this.z));
     return this;
   }
   /**
    * Floors this vector.
    *
    * @return {Vector3} This vector.
    */
 
 
   floor() {
     this.x = Math.floor(this.x);
     this.y = Math.floor(this.y);
     this.z = Math.floor(this.z);
     return this;
   }
   /**
    * Ceils this vector.
    *
    * @return {Vector3} This vector.
    */
 
 
   ceil() {
     this.x = Math.ceil(this.x);
     this.y = Math.ceil(this.y);
     this.z = Math.ceil(this.z);
     return this;
   }
   /**
    * Rounds this vector.
    *
    * @return {Vector3} This vector.
    */
 
 
   round() {
     this.x = Math.round(this.x);
     this.y = Math.round(this.y);
     this.z = Math.round(this.z);
     return this;
   }
   /**
    * Lerps towards the given vector.
    *
    * @param {Vector3} v - The target vector.
    * @param {Number} alpha - The lerp factor.
    * @return {Vector3} This vector.
    */
 
 
   lerp(v, alpha) {
     this.x += (v.x - this.x) * alpha;
     this.y += (v.y - this.y) * alpha;
     this.z += (v.z - this.z) * alpha;
     return this;
   }
   /**
    * Sets this vector to the lerp result of the given vectors.
    *
    * @param {Vector3} v1 - A base vector.
    * @param {Vector3} v2 - The target vector.
    * @param {Number} alpha - The lerp factor.
    * @return {Vector3} This vector.
    */
 
 
   lerpVectors(v1, v2, alpha) {
     return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
   }
   /**
    * Checks if this vector equals the given one.
    *
    * @param {Vector3} v - A vector.
    * @return {Boolean} Whether this vector equals the given one.
    */
 
 
   equals(v) {
     return v.x === this.x && v.y === this.y && v.z === this.z;
   }
 
 }
 /**
  * A vector.
  *
  * @type {Vector3}
  * @private
  */
 
 
 const v = new Vector3();
 /**
  * A list of points.
  *
  * @type {Vector3[]}
  * @private
  */
 
 const points = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];
 /**
  * A 3D box.
  */
 
 class Box3 {
   /**
    * Constructs a new box.
    *
    * @param {Vector3} [min] - The lower bounds.
    * @param {Vector3} [max] - The upper bounds.
    */
   constructor(min = new Vector3(Infinity, Infinity, Infinity), max = new Vector3(-Infinity, -Infinity, -Infinity)) {
     /**
      * The lower bounds.
      *
      * @type {Vector3}
      */
     this.min = min;
     /**
      * The upper bounds.
      *
      * @type {Vector3}
      */
 
     this.max = max;
   }
   /**
    * Sets the values of this box.
    *
    * @param {Vector3} min - The lower bounds.
    * @param {Vector3} max - The upper bounds.
    * @return {Box3} This box.
    */
 
 
   set(min, max) {
     this.min.copy(min);
     this.max.copy(max);
     return this;
   }
   /**
    * Copies the values of a given box.
    *
    * @param {Box3} b - A box.
    * @return {Box3} This box.
    */
 
 
   copy(b) {
     this.min.copy(b.min);
     this.max.copy(b.max);
     return this;
   }
   /**
    * Clones this box.
    *
    * @return {Box3} A clone of this box.
    */
 
 
   clone() {
     return new this.constructor().copy(this);
   }
   /**
    * Makes this box empty.
    *
    * The lower bounds are set to infinity and the upper bounds to negative
    * infinity to create an infinitely small box.
    *
    * @return {Box3} This box.
    */
 
 
   makeEmpty() {
     this.min.x = this.min.y = this.min.z = Infinity;
     this.max.x = this.max.y = this.max.z = -Infinity;
     return this;
   }
   /**
    * Indicates whether this box is truly empty.
    *
    * This is a more robust check for emptiness since the volume can get positive
    * with two negative axes.
    *
    * @return {Box3} This box.
    */
 
 
   isEmpty() {
     return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
   }
   /**
    * Computes the center of this box.
    *
    * @param {Vector3} [target] - A target vector. If none is provided, a new one will be created.
    * @return {Vector3} A vector that describes the center of this box.
    */
 
 
   getCenter(target = new Vector3()) {
     return !this.isEmpty() ? target.addVectors(this.min, this.max).multiplyScalar(0.5) : target.set(0, 0, 0);
   }
   /**
    * Computes the size of this box.
    *
    * @param {Vector3} [target] - A target vector. If none is provided, a new one will be created.
    * @return {Vector3} A vector that describes the size of this box.
    */
 
 
   getSize(target = new Vector3()) {
     return !this.isEmpty() ? target.subVectors(this.max, this.min) : target.set(0, 0, 0);
   }
   /**
    * Computes the bounding box of the given sphere.
    *
    * @param {Sphere} sphere - A sphere.
    * @return {Box3} This box.
    */
 
 
   setFromSphere(sphere) {
     this.set(sphere.center, sphere.center);
     this.expandByScalar(sphere.radius);
     return this;
   }
   /**
    * Expands this box by the given point.
    *
    * @param {Vector3} p - A point.
    * @return {Box3} This box.
    */
 
 
   expandByPoint(p) {
     this.min.min(p);
     this.max.max(p);
     return this;
   }
   /**
    * Expands this box by the given vector.
    *
    * @param {Vector3} v - A vector.
    * @return {Box3} This box.
    */
 
 
   expandByVector(v) {
     this.min.sub(v);
     this.max.add(v);
     return this;
   }
   /**
    * Expands this box by the given scalar.
    *
    * @param {Number} s - A scalar.
    * @return {Box3} This box.
    */
 
 
   expandByScalar(s) {
     this.min.addScalar(-s);
     this.max.addScalar(s);
     return this;
   }
   /**
    * Defines this box by the given points.
    *
    * @param {Vector3[]} points - The points.
    * @return {Box3} This box.
    */
 
 
   setFromPoints(points) {
     let i, l;
     this.min.set(0, 0, 0);
     this.max.set(0, 0, 0);
 
     for (i = 0, l = points.length; i < l; ++i) {
       this.expandByPoint(points[i]);
     }
 
     return this;
   }
   /**
    * Defines this box by the given center and size.
    *
    * @param {Vector3} center - The center.
    * @param {Number} size - The size.
    * @return {Box3} This box.
    */
 
 
   setFromCenterAndSize(center, size) {
     const halfSize = v.copy(size).multiplyScalar(0.5);
     this.min.copy(center).sub(halfSize);
     this.max.copy(center).add(halfSize);
     return this;
   }
   /**
    * Clamps the given point to the boundaries of this box.
    *
    * @param {Vector3} point - A point.
    * @param {Vector3} [target] - A target vector. If none is provided, a new one will be created.
    * @return {Vector3} The clamped point.
    */
 
 
   clampPoint(point, target = new Vector3()) {
     return target.copy(point).clamp(this.min, this.max);
   }
   /**
    * Calculates the distance from this box to the given point.
    *
    * @param {Vector3} p - A point.
    * @return {Number} The distance.
    */
 
 
   distanceToPoint(p) {
     const clampedPoint = v.copy(p).clamp(this.min, this.max);
     return clampedPoint.sub(p).length();
   }
   /**
    * Applies the given matrix to this box.
    *
    * @param {Matrix4} m - The matrix.
    * @return {Box3} This box.
    */
 
 
   applyMatrix4(m) {
     const min = this.min;
     const max = this.max;
 
     if (!this.isEmpty()) {
       points[0].set(min.x, min.y, min.z).applyMatrix4(m);
       points[1].set(min.x, min.y, max.z).applyMatrix4(m);
       points[2].set(min.x, max.y, min.z).applyMatrix4(m);
       points[3].set(min.x, max.y, max.z).applyMatrix4(m);
       points[4].set(max.x, min.y, min.z).applyMatrix4(m);
       points[5].set(max.x, min.y, max.z).applyMatrix4(m);
       points[6].set(max.x, max.y, min.z).applyMatrix4(m);
       points[7].set(max.x, max.y, max.z).applyMatrix4(m);
       this.setFromPoints(points);
     }
 
     return this;
   }
   /**
    * Translates this box.
    *
    * @param {Vector3} offset - The offset.
    * @return {Box3} This box.
    */
 
 
   translate(offset) {
     this.min.add(offset);
     this.max.add(offset);
     return this;
   }
   /**
    * Intersects this box with the given one.
    *
    * @param {Box3} b - A box.
    * @return {Box3} This box.
    */
 
 
   intersect(b) {
     this.min.max(b.min);
     this.max.min(b.max);
     /* Ensure that if there is no overlap, the result is fully empty to prevent
     subsequent intersections to erroneously return valid values. */
 
     if (this.isEmpty()) {
       this.makeEmpty();
     }
 
     return this;
   }
   /**
    * Expands this box by combining it with the given one.
    *
    * @param {Box3} b - A box.
    * @return {Box3} This box.
    */
 
 
   union(b) {
     this.min.min(b.min);
     this.max.max(b.max);
     return this;
   }
   /**
    * Checks if the given point lies inside this box.
    *
    * @param {Vector3} p - A point.
    * @return {Boolean} Whether this box contains the point.
    */
 
 
   containsPoint(p) {
     const min = this.min;
     const max = this.max;
     return p.x >= min.x && p.y >= min.y && p.z >= min.z && p.x <= max.x && p.y <= max.y && p.z <= max.z;
   }
   /**
    * Checks if the given box lies inside this box.
    *
    * @param {Box3} b - A box.
    * @return {Boolean} Whether this box contains the given one.
    */
 
 
   containsBox(b) {
     const tMin = this.min;
     const tMax = this.max;
     const bMin = b.min;
     const bMax = b.max;
     return tMin.x <= bMin.x && bMax.x <= tMax.x && tMin.y <= bMin.y && bMax.y <= tMax.y && tMin.z <= bMin.z && bMax.z <= tMax.z;
   }
   /**
    * Checks if this box intersects the given one.
    *
    * @param {Box3} b - A box.
    * @return {Boolean} Whether the boxes intersect.
    */
 
 
   intersectsBox(b) {
     const tMin = this.min;
     const tMax = this.max;
     const bMin = b.min;
     const bMax = b.max;
     return bMax.x >= tMin.x && bMax.y >= tMin.y && bMax.z >= tMin.z && bMin.x <= tMax.x && bMin.y <= tMax.y && bMin.z <= tMax.z;
   }
   /**
    * Checks if this box intersects the given sphere.
    *
    * @param {Sphere} s - A sphere.
    * @return {Boolean} Whether the box intersects the sphere.
    */
 
 
   intersectsSphere(s) {
     // Find the point in this box that is closest to the sphere's center.
     const closestPoint = this.clampPoint(s.center, v); // If that point is inside the sphere, it intersects this box.
 
     return closestPoint.distanceToSquared(s.center) <= s.radius * s.radius;
   }
   /**
    * Checks if this box intersects the given plane.
    *
    * Computes the minimum and maximum dot product values. If those values are on
    * the same side (back or front) of the plane, then there is no intersection.
    *
    * @param {Plane} p - A plane.
    * @return {Boolean} Whether the box intersects the plane.
    */
 
 
   intersectsPlane(p) {
     let min, max;
 
     if (p.normal.x > 0) {
       min = p.normal.x * this.min.x;
       max = p.normal.x * this.max.x;
     } else {
       min = p.normal.x * this.max.x;
       max = p.normal.x * this.min.x;
     }
 
     if (p.normal.y > 0) {
       min += p.normal.y * this.min.y;
       max += p.normal.y * this.max.y;
     } else {
       min += p.normal.y * this.max.y;
       max += p.normal.y * this.min.y;
     }
 
     if (p.normal.z > 0) {
       min += p.normal.z * this.min.z;
       max += p.normal.z * this.max.z;
     } else {
       min += p.normal.z * this.max.z;
       max += p.normal.z * this.min.z;
     }
 
     return min <= -p.constant && max >= -p.constant;
   }
   /**
    * Checks if this box equals the given one.
    *
    * @param {Box3} b - A box.
    * @return {Boolean} Whether this box equals the given one.
    */
 
 
   equals(b) {
     return b.min.equals(this.min) && b.max.equals(this.max);
   }
 
 }
 /**
  * A list of vectors.
  *
  * @type {Vector3[]}
  * @private
  */
 
 
 const v$4 = [new Vector3(), new Vector3(), new Vector3(), new Vector3()];
 /**
  * A ray.
  */
 
 class Ray {
   /**
    * Constructs a new ray.
    *
    * @param {Vector3} [origin] - The origin.
    * @param {Vector3} [direction] - The direction.
    */
   constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)) {
     /**
      * The origin.
      *
      * @type {Vector3}
      */
     this.origin = origin;
     /**
      * The direction.
      *
      * @type {Vector3}
      */
 
     this.direction = direction;
   }
   /**
    * Sets the origin and the direction.
    *
    * @param {Vector3} origin - The origin.
    * @param {Vector3} direction - The direction. Should be normalized.
    * @return {Ray} This ray.
    */
 
 
   set(origin, direction) {
     this.origin.copy(origin);
     this.direction.copy(direction);
     return this;
   }
   /**
    * Copies the given ray.
    *
    * @param {Ray} r - A ray.
    * @return {Ray} This ray.
    */
 
 
   copy(r) {
     this.origin.copy(r.origin);
     this.direction.copy(r.direction);
     return this;
   }
   /**
    * Clones this ray.
    *
    * @return {Ray} The cloned ray.
    */
 
 
   clone() {
     return new this.constructor().copy(this);
   }
   /**
    * Computes a point along the ray based on a given scalar t.
    *
    * @param {Number} t - The scalar.
    * @param {Vector3} [target] - A target vector. If none is provided, a new one will be created.
    * @return {Vector3} The point.
    */
 
 
   at(t, target = new Vector3()) {
     return target.copy(this.direction).multiplyScalar(t).add(this.origin);
   }
   /**
    * Rotates this ray to look at the given target.
    *
    * @param {Vector3} target - A point to look at.
    * @return {Ray} This ray.
    */
 
 
   lookAt(target) {
     this.direction.copy(target).sub(this.origin).normalize();
     return this;
   }
   /**
    * Moves the origin along the ray by a given scalar t.
    *
    * @param {Number} t - The scalar.
    * @return {Ray} This ray.
    */
 
 
   recast(t) {
     this.origin.copy(this.at(t, v$4[0]));
     return this;
   }
   /**
    * Finds the closest point along this ray to a given point.
    *
    * @param {Vector3} p - A point.
    * @param {Vector3} [target] - A target vector. If none is provided, a new one will be created.
    * @return {Vector3} The point.
    */
 
 
   closestPointToPoint(p, target = new Vector3()) {
     const directionDistance = target.subVectors(p, this.origin).dot(this.direction);
     return directionDistance >= 0.0 ? target.copy(this.direction).multiplyScalar(directionDistance).add(this.origin) : target.copy(this.origin);
   }
   /**
    * Calculates the squared distance from this ray to the given point.
    *
    * @param {Vector3} p - The point.
    * @return {Number} The squared distance.
    */
 
 
   distanceSquaredToPoint(p) {
     const directionDistance = v$4[0].subVectors(p, this.origin).dot(this.direction); // Check if the point is behind the ray.
 
     return directionDistance < 0.0 ? this.origin.distanceToSquared(p) : v$4[0].copy(this.direction).multiplyScalar(directionDistance).add(this.origin).distanceToSquared(p);
   }
   /**
    * Calculates the distance from this ray to the given point.
    *
    * @param {Vector3} p - The point.
    * @return {Number} The distance.
    */
 
 
   distanceToPoint(p) {
     return Math.sqrt(this.distanceSquaredToPoint(p));
   }
   /**
    * Calculates the distance from this ray to the given plane.
    *
    * @param {Plane} p - The plane.
    * @return {Number} The distance, or null if the denominator is zero.
    */
 
 
   distanceToPlane(p) {
     const denominator = p.normal.dot(this.direction);
     const t = denominator !== 0.0 ? -(this.origin.dot(p.normal) + p.constant) / denominator : p.distanceToPoint(this.origin) === 0.0 ? 0.0 : -1.0;
     return t >= 0.0 ? t : null;
   }
   /**
    * Calculates the distance from this ray to a given line segment.
    *
    * Based on:
    *  http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
    *
    * @param {Vector3} v0 - The start of the segment.
    * @param {Vector3} v1 - The end of the segment.
    * @param {Vector3} [pointOnRay] - If provided, the point on this Ray that is closest to the segment will be stored in this vector.
    * @param {Vector3} [pointOnSegment] - If provided, the point on the line segment that is closest to this ray will be stored in this vector.
    * @return {Number} The smallest distance between the ray and the segment defined by v0 and v1.
    */
 
 
   distanceSquaredToSegment(v0, v1, pointOnRay, pointOnSegment) {
     const segCenter = v$4[0].copy(v0).add(v1).multiplyScalar(0.5);
     const segDir = v$4[1].copy(v1).sub(v0).normalize();
     const diff = v$4[2].copy(this.origin).sub(segCenter);
     const segExtent = v0.distanceTo(v1) * 0.5;
     const a01 = -this.direction.dot(segDir);
     const b0 = diff.dot(this.direction);
     const b1 = -diff.dot(segDir);
     const c = diff.lengthSq();
     const det = Math.abs(1.0 - a01 * a01);
     let s0, s1, extDet, invDet, sqrDist;
 
     if (det > 0.0) {
       // The ray and segment are not parallel.
       s0 = a01 * b1 - b0;
       s1 = a01 * b0 - b1;
       extDet = segExtent * det;
 
       if (s0 >= 0.0) {
         if (s1 >= -extDet) {
           if (s1 <= extDet) {
             // Region 0.
             // Minimum at interior points of ray and segment.
             invDet = 1.0 / det;
             s0 *= invDet;
             s1 *= invDet;
             sqrDist = s0 * (s0 + a01 * s1 + 2.0 * b0) + s1 * (a01 * s0 + s1 + 2.0 * b1) + c;
           } else {
             // Region 1.
             s1 = segExtent;
             s0 = Math.max(0.0, -(a01 * s1 + b0));
             sqrDist = -s0 * s0 + s1 * (s1 + 2.0 * b1) + c;
           }
         } else {
           // Region 5.
           s1 = -segExtent;
           s0 = Math.max(0.0, -(a01 * s1 + b0));
           sqrDist = -s0 * s0 + s1 * (s1 + 2.0 * b1) + c;
         }
       } else {
         if (s1 <= -extDet) {
           // Region 4.
           s0 = Math.max(0.0, -(-a01 * segExtent + b0));
           s1 = s0 > 0.0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
           sqrDist = -s0 * s0 + s1 * (s1 + 2.0 * b1) + c;
         } else if (s1 <= extDet) {
           // Region 3.
           s0 = 0.0;
           s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
           sqrDist = s1 * (s1 + 2.0 * b1) + c;
         } else {
           // Region 2.
           s0 = Math.max(0.0, -(a01 * segExtent + b0));
           s1 = s0 > 0.0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
           sqrDist = -s0 * s0 + s1 * (s1 + 2.0 * b1) + c;
         }
       }
     } else {
       // Ray and segment are parallel.
       s1 = a01 > 0.0 ? -segExtent : segExtent;
       s0 = Math.max(0.0, -(a01 * s1 + b0));
       sqrDist = -s0 * s0 + s1 * (s1 + 2.0 * b1) + c;
     }
 
     if (pointOnRay !== undefined) {
       pointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
     }
 
     if (pointOnSegment !== undefined) {
       pointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter);
     }
 
     return sqrDist;
   }
   /**
    * Finds the point where this ray intersects the given sphere.
    *
    * @param {Sphere} s - A sphere.
    * @param {Vector3} [target] - A target vector. If none is provided, a new one will be created.
    * @return {Vector3} The point of intersection, or null if there is none.
    */
 
 
   intersectSphere(s, target = new Vector3()) {
     const ab = v$4[0].subVectors(s.center, this.origin);
     const tca = ab.dot(this.direction);
     const d2 = ab.dot(ab) - tca * tca;
     const radius2 = s.radius * s.radius;
     let result = null;
     let thc, t0, t1;
 
     if (d2 <= radius2) {
       thc = Math.sqrt(radius2 - d2); // t0 = first intersection point - entrance on front of sphere.
 
       t0 = tca - thc; // t1 = second intersection point - exit point on back of sphere.
 
       t1 = tca + thc; // Check if both t0 and t1 are behind the ray - if so, return null.
 
       if (t0 >= 0.0 || t1 >= 0.0) {
         /* Check if t0 is behind the ray. If it is, the ray is inside the
         sphere, so return the second exit point scaled by t1 in order to always
         return an intersection point that is in front of the ray. If t0 is in
         front of the ray, return the first collision point scaled by t0. */
         result = t0 < 0.0 ? this.at(t1, target) : this.at(t0, target);
       }
     }
 
     return result;
   }
   /**
    * Determines whether this ray intersects the given sphere.
    *
    * @param {Sphere} s - A sphere.
    * @return {Boolean} Whether this ray intersects the given sphere.
    */
 
 
   intersectsSphere(s) {
     return this.distanceSqToPoint(s.center) <= s.radius * s.radius;
   }
   /**
    * Finds the point where this ray intersects the given plane.
    *
    * @param {Plane} p - A plane.
    * @param {Vector3} [target] - A target vector. If none is provided, a new one will be created.
    * @return {Vector3} The point of intersection, or null if there is none.
    */
 
 
   intersectPlane(p, target = new Vector3()) {
     const t = this.distanceToPlane(p);
     return t === null ? null : this.at(t, target);
   }
   /**
    * Determines whether this ray intersects the given plane.
    *
    * @param {Plane} p - A plane.
    * @return {Boolean} Whether this ray intersects the given plane.
    */
 
 
   intersectsPlane(p) {
     const distanceToPoint = p.distanceToPoint(this.origin);
     return distanceToPoint === 0.0 || p.normal.dot(this.direction) * distanceToPoint < 0.0;
   }
   /**
    * Finds the point where this ray intersects the given box.
    *
    * @param {Plane} b - A box.
    * @param {Vector3} [target] - A target vector. If none is provided, a new one will be created.
    * @return {Vector3} The point of intersection, or null if there is none.
    */
 
 
   intersectBox(b, target = new Vector3()) {
     const origin = this.origin;
     const direction = this.direction;
     const min = b.min;
     const max = b.max;
     const invDirX = 1.0 / direction.x;
     const invDirY = 1.0 / direction.y;
     const invDirZ = 1.0 / direction.z;
     let result = null;
     let tmin, tmax, tymin, tymax, tzmin, tzmax;
 
     if (invDirX >= 0.0) {
       tmin = (min.x - origin.x) * invDirX;
       tmax = (max.x - origin.x) * invDirX;
     } else {
       tmin = (max.x - origin.x) * invDirX;
       tmax = (min.x - origin.x) * invDirX;
     }
 
     if (invDirY >= 0.0) {
       tymin = (min.y - origin.y) * invDirY;
       tymax = (max.y - origin.y) * invDirY;
     } else {
       tymin = (max.y - origin.y) * invDirY;
       tymax = (min.y - origin.y) * invDirY;
     }
 
     if (tmin <= tymax && tymin <= tmax) {
       /* Handle the case where tmin or tmax is NaN (result of 0 * Infinity).
       Note: x !== x returns true if x is NaN. */
       if (tymin > tmin || tmin !== tmin) {
         tmin = tymin;
       }
 
       if (tymax < tmax || tmax !== tmax) {
         tmax = tymax;
       }
 
       if (invDirZ >= 0.0) {
         tzmin = (min.z - origin.z) * invDirZ;
         tzmax = (max.z - origin.z) * invDirZ;
       } else {
         tzmin = (max.z - origin.z) * invDirZ;
         tzmax = (min.z - origin.z) * invDirZ;
       }
 
       if (tmin <= tzmax && tzmin <= tmax) {
         if (tzmin > tmin || tmin !== tmin) {
           tmin = tzmin;
         }
 
         if (tzmax < tmax || tmax !== tmax) {
           tmax = tzmax;
         } // Return the closest point (positive side).
 
 
         if (tmax >= 0.0) {
           result = this.at(tmin >= 0.0 ? tmin : tmax, target);
         }
       }
     }
 
     return result;
   }
   /**
    * Determines whether this ray intersects the given box.
    *
    * @param {Box3} b - A box.
    * @return {Boolean} Whether this ray intersects the given box.
    */
 
 
   intersectsBox(b) {
     return this.intersectBox(b, v$4[0]) !== null;
   }
   /**
    * Finds the point where this ray intersects the given triangle.
    *
    * Based on:
    *  http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
    *
    * @param {Vector3} a - A triangle vertex.
    * @param {Vector3} b - A triangle vertex.
    * @param {Vector3} c - A triangle vertex.
    * @param {Boolean} [backfaceCulling=false] - Whether backface culling should be considered.
    * @param {Vector3} [target] - A target vector. If none is provided, a new one will be created.
    * @return {Vector3} The point of intersection, or null if there is none.
    */
 
 
   intersectTriangle(a, b, c, backfaceCulling, target) {
     const direction = this.direction; // Compute the offset origin, edges, and normal.
 
     const diff = v$4[0];
     const edge1 = v$4[1];
     const edge2 = v$4[2];
     const normal = v$4[3];
     let result = null;
     let DdN, sign, DdQxE2, DdE1xQ, QdN;
     edge1.subVectors(b, a);
     edge2.subVectors(c, a);
     normal.crossVectors(edge1, edge2);
     /* Solve Q + t * D = b1 * E1 + b2 * E2
      * (Q = kDiff, D = ray direction, E1 = kEdge1, E2 = kEdge2,
      * N = Cross(E1, E2)):
      *
      *   | Dot(D, N) | * b1 = sign(Dot(D, N)) * Dot(D, Cross(Q, E2))
      *   | Dot(D, N) | * b2 = sign(Dot(D, N)) * Dot(D, Cross(E1, Q))
      *   | Dot(D, N) | * t = -sign(Dot(D, N)) * Dot(Q, N)
      */
 
     DdN = direction.dot(normal); // Discard coplanar constellations and cull backfaces.
 
     if (DdN !== 0.0 && !(backfaceCulling && DdN > 0.0)) {
       if (DdN > 0.0) {
         sign = 1.0;
       } else {
         sign = -1.0;
         DdN = -DdN;
       }
 
       diff.subVectors(this.origin, a);
       DdQxE2 = sign * direction.dot(edge2.crossVectors(diff, edge2)); // b1 < 0, no intersection.
 
       if (DdQxE2 >= 0.0) {
         DdE1xQ = sign * direction.dot(edge1.cross(diff)); // b2 < 0, or b1 + b2 > 1, no intersection.
 
         if (DdE1xQ >= 0.0 && DdQxE2 + DdE1xQ <= DdN) {
           // The line intersects the triangle, check if the ray does.
           QdN = -sign * diff.dot(normal); // t < 0, no intersection.
 
           if (QdN >= 0.0) {
             // Ray intersects triangle.
             result = this.at(QdN / DdN, target);
           }
         }
       }
     }
 
     return result;
   }
   /**
    * Applies the given matrix to this ray.
    *
    * @param {Matrix4} m - A matrix.
    * @return {Ray} This ray.
    */
 
 
   applyMatrix4(m) {
     this.origin.applyMatrix4(m);
     this.direction.transformDirection(m);
     return this;
   }
   /**
    * Checks if this ray equals the given one.
    *
    * @param {Ray} r - A ray.
    * @return {Boolean} Whether the rays are equal.
    */
 
 
   equals(r) {
     return r.origin.equals(this.origin) && r.direction.equals(this.direction);
   }
 
 }
 /**
  * A vector with four components.
  */
 
 
 class Vector4 {
   /**
    * Constructs a new vector.
    *
    * @param {Number} [x=0] - The X component.
    * @param {Number} [y=0] - The Y component.
    * @param {Number} [z=0] - The Z component.
    * @param {Number} [w=0] - The W component.
    */
   constructor(x = 0, y = 0, z = 0, w = 0) {
     /**
      * The X component.
      *
      * @type {Number}
      */
     this.x = x;
     /**
      * The Y component.
      *
      * @type {Number}
      */
 
     this.y = y;
     /**
      * The Z component.
      *
      * @type {Number}
      */
 
     this.z = z;
     /**
      * The W component.
      *
      * @type {Number}
      */
 
     this.w = w;
   }
   /**
    * Sets the values of this vector
    *
    * @param {Number} x - The X component.
    * @param {Number} y - The Y component.
    * @param {Number} z - The Z component.
    * @param {Number} w - The W component.
    * @return {Vector4} This vector.
    */
 
 
   set(x, y, z, w) {
     this.x = x;
     this.y = y;
     this.z = z;
     this.w = w;
     return this;
   }
   /**
    * Copies the values of another vector.
    *
    * @param {Vector4} v - A vector.
    * @return {Vector4} This vector.
    */
 
 
   copy(v) {
     this.x = v.x;
     this.y = v.y;
     this.z = v.z;
     this.w = v.w;
     return this;
   }
   /**
    * Clones this vector.
    *
    * @return {Vector4} A clone of this vector.
    */
 
 
   clone() {
     return new this.constructor(this.x, this.y, this.z, this.w);
   }
   /**
    * Copies values from an array.
    *
    * @param {Number[]} array - An array.
    * @param {Number} offset - An offset.
    * @return {Vector4} This vector.
    */
 
 
   fromArray(array, offset = 0) {
     this.x = array[offset];
     this.y = array[offset + 1];
     this.z = array[offset + 2];
     this.w = array[offset + 3];
     return this;
   }
   /**
    * Stores this vector in an array.
    *
    * @param {Array} [array] - A target array.
    * @param {Number} offset - An offset.
    * @return {Number[]} The array.
    */
 
 
   toArray(array = [], offset = 0) {
     array[offset] = this.x;
     array[offset + 1] = this.y;
     array[offset + 2] = this.z;
     array[offset + 3] = this.w;
     return array;
   }
   /**
    * Stores the axis angle from the given quaternion in this vector.
    *
    * For more details see:
    *  http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
    *
    * @param {Quaternion} q - A quaternion. Assumed to be normalized
    * @return {Vector4} This vector.
    */
 
 
   setAxisAngleFromQuaternion(q) {
     this.w = 2 * Math.acos(q.w);
     const s = Math.sqrt(1 - q.w * q.w);
 
     if (s < 1e-4) {
       this.x = 1;
       this.y = 0;
       this.z = 0;
     } else {
       this.x = q.x / s;
       this.y = q.y / s;
       this.z = q.z / s;
     }
 
     return this;
   }
   /**
    * Stores the axis angle from the given rotation matrix in this vector.
    *
    * For more details see:
    *  http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
    *
    * @param {Matrix4} m - A matrix. The upper 3x3 must be a pure rotation matrix (i.e. unscaled).
    * @return {Vector4} This vector.
    */
 
 
   setAxisAngleFromRotationMatrix(m) {
     // Margin to allow for rounding errors.
     const E = 0.01; // Margin to distinguish between 0 and 180 degrees.
 
     const H = 0.1;
     const me = m.elements;
     const m00 = me[0],
           m01 = me[4],
           m02 = me[8];
     const m10 = me[1],
           m11 = me[5],
           m12 = me[9];
     const m20 = me[2],
           m21 = me[6],
           m22 = me[10];
     let angle;
     let x, y, z;
     let xx, yy, zz;
     let xy, xz, yz;
     let s;
 
     if (Math.abs(m01 - m10) < E && Math.abs(m02 - m20) < E && Math.abs(m12 - m21) < E) {
       /* Singularity found. First, check for identity matrix which must have +1
       for all terms in the leading diagonal and zero in other terms. */
       if (Math.abs(m01 + m10) < H && Math.abs(m02 + m20) < H && Math.abs(m12 + m21) < H && Math.abs(m00 + m11 + m22 - 3) < H) {
         // This singularity is the identity matrix. The angle is zero.
         this.set(1, 0, 0, 0);
       } else {
         // The angle is 180.
         angle = Math.PI;
         xx = (m00 + 1) / 2;
         yy = (m11 + 1) / 2;
         zz = (m22 + 1) / 2;
         xy = (m01 + m10) / 4;
         xz = (m02 + m20) / 4;
         yz = (m12 + m21) / 4;
 
         if (xx > yy && xx > zz) {
           // m00 is the largest diagonal term.
           if (xx < E) {
             x = 0;
             y = 0.707106781;
             z = 0.707106781;
           } else {
             x = Math.sqrt(xx);
             y = xy / x;
             z = xz / x;
           }
         } else if (yy > zz) {
           // m11 is the largest diagonal term.
           if (yy < E) {
             x = 0.707106781;
             y = 0;
             z = 0.707106781;
           } else {
             y = Math.sqrt(yy);
             x = xy / y;
             z = yz / y;
           }
         } else {
           // m22 is the largest diagonal term.
           if (zz < E) {
             x = 0.707106781;
             y = 0.707106781;
             z = 0;
           } else {
             z = Math.sqrt(zz);
             x = xz / z;
             y = yz / z;
           }
         }
 
         this.set(x, y, z, angle);
       }
     } else {
       // There are no singularities.
       s = Math.sqrt((m21 - m12) * (m21 - m12) + (m02 - m20) * (m02 - m20) + (m10 - m01) * (m10 - m01)); // Prevent division by zero.
 
       if (Math.abs(s) < 0.001) {
         s = 1;
       }
 
       this.x = (m21 - m12) / s;
       this.y = (m02 - m20) / s;
       this.z = (m10 - m01) / s;
       this.w = Math.acos((m00 + m11 + m22 - 1) / 2);
     }
 
     return this;
   }
   /**
    * Adds a vector to this one.
    *
    * @param {Vector4} v - The vector to add.
    * @return {Vector4} This vector.
    */
 
 
   add(v) {
     this.x += v.x;
     this.y += v.y;
     this.z += v.z;
     this.w += v.w;
     return this;
   }
   /**
    * Adds a scalar to this vector.
    *
    * @param {Number} s - The scalar to add.
    * @return {Vector4} This vector.
    */
 
 
   addScalar(s) {
     this.x += s;
     this.y += s;
     this.z += s;
     this.w += s;
     return this;
   }
   /**
    * Sets this vector to the sum of two given vectors.
    *
    * @param {Vector4} a - A vector.
    * @param {Vector4} b - Another vector.
    * @return {Vector4} This vector.
    */
 
 
   addVectors(a, b) {
     this.x = a.x + b.x;
     this.y = a.y + b.y;
     this.z = a.z + b.z;
     this.w = a.w + b.w;
     return this;
   }
   /**
    * Adds a scaled vector to this one.
    *
    * @param {Vector4} v - The vector to scale and add.
    * @param {Number} s - A scalar.
    * @return {Vector4} This vector.
    */
 
 
   addScaledVector(v, s) {
     this.x += v.x * s;
     this.y += v.y * s;
     this.z += v.z * s;
     this.w += v.w * s;
     return this;
   }
   /**
    * Subtracts a vector from this vector.
    *
    * @param {Vector4} v - The vector to subtract.
    * @return {Vector4} This vector.
    */
 
 
   sub(v) {
     this.x -= v.x;
     this.y -= v.y;
     this.z -= v.z;
     this.w -= v.w;
     return this;
   }
   /**
    * Subtracts a scalar from this vector.
    *
    * @param {Number} s - The scalar to subtract.
    * @return {Vector4} This vector.
    */
 
 
   subScalar(s) {
     this.x -= s;
     this.y -= s;
     this.z -= s;
     this.w -= s;
     return this;
   }
   /**
    * Sets this vector to the difference between two given vectors.
    *
    * @param {Vector4} a - A vector.
    * @param {Vector4} b - A second vector.
    * @return {Vector4} This vector.
    */
 
 
   subVectors(a, b) {
     this.x = a.x - b.x;
     this.y = a.y - b.y;
     this.z = a.z - b.z;
     this.w = a.w - b.w;
     return this;
   }
   /**
    * Multiplies this vector with another vector.
    *
    * @param {Vector4} v - A vector.
    * @return {Vector4} This vector.
    */
 
 
   multiply(v) {
     this.x *= v.x;
     this.y *= v.y;
     this.z *= v.z;
     this.w *= v.w;
     return this;
   }
   /**
    * Multiplies this vector with a given scalar.
    *
    * @param {Number} s - A scalar.
    * @return {Vector4} This vector.
    */
 
 
   multiplyScalar(s) {
     this.x *= s;
     this.y *= s;
     this.z *= s;
     this.w *= s;
     return this;
   }
   /**
    * Sets this vector to the product of two given vectors.
    *
    * @param {Vector4} a - A vector.
    * @param {Vector4} b - Another vector.
    * @return {Vector4} This vector.
    */
 
 
   multiplyVectors(a, b) {
     this.x = a.x * b.x;
     this.y = a.y * b.y;
     this.z = a.z * b.z;
     this.w = a.w * b.w;
     return this;
   }
   /**
    * Divides this vector by another vector.
    *
    * @param {Vector4} v - A vector.
    * @return {Vector4} This vector.
    */
 
 
   divide(v) {
     this.x /= v.x;
     this.y /= v.y;
     this.z /= v.z;
     this.w /= v.w;
     return this;
   }
   /**
    * Divides this vector by a given scalar.
    *
    * @param {Number} s - A scalar.
    * @return {Vector4} This vector.
    */
 
 
   divideScalar(s) {
     this.x /= s;
     this.y /= s;
     this.z /= s;
     this.w /= s;
     return this;
   }
   /**
    * Applies a matrix to this vector.
    *
    * @param {Matrix4} m - A matrix.
    * @return {Vector4} This vector.
    */
 
 
   applyMatrix4(m) {
     const x = this.x,
           y = this.y,
           z = this.z,
           w = this.w;
     const e = m.elements;
     this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
     this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
     this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
     this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
     return this;
   }
   /**
    * Negates this vector.
    *
    * @return {Vector4} This vector.
    */
 
 
   negate() {
     this.x = -this.x;
     this.y = -this.y;
     this.z = -this.z;
     this.w = -this.w;
     return this;
   }
   /**
    * Calculates the dot product with another vector.
    *
    * @param {Vector4} v - A vector.
    * @return {Number} The dot product.
    */
 
 
   dot(v) {
     return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
   }
   /**
    * Calculates the Manhattan length of this vector.
    *
    * @return {Number} The length.
    */
 
 
   manhattanLength() {
     return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
   }
   /**
    * Calculates the squared length of this vector.
    *
    * @return {Number} The squared length.
    */
 
 
   lengthSquared() {
     return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
   }
   /**
    * Calculates the length of this vector.
    *
    * @return {Number} The length.
    */
 
 
   length() {
     return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
   }
   /**
    * Calculates the Manhattan distance to a given vector.
    *
    * @param {Vector4} v - A vector.
    * @return {Number} The distance.
    */
 
 
   manhattanDistanceTo(v) {
     return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z) + Math.abs(this.w - v.w);
   }
   /**
    * Calculates the squared distance to a given vector.
    *
    * @param {Vector4} v - A vector.
    * @return {Number} The squared distance.
    */
 
 
   distanceToSquared(v) {
     const dx = this.x - v.x;
     const dy = this.y - v.y;
     const dz = this.z - v.z;
     const dw = this.w - v.w;
     return dx * dx + dy * dy + dz * dz + dw * dw;
   }
   /**
    * Calculates the distance to a given vector.
    *
    * @param {Vector4} v - A vector.
    * @return {Number} The distance.
    */
 
 
   distanceTo(v) {
     return Math.sqrt(this.distanceToSquared(v));
   }
   /**
    * Normalizes this vector.
    *
    * @return {Vector4} This vector.
    */
 
 
   normalize() {
     return this.divideScalar(this.length());
   }
   /**
    * Sets the length of this vector.
    *
    * @param {Number} length - The new length.
    * @return {Vector4} This vector.
    */
 
 
   setLength(length) {
     return this.normalize().multiplyScalar(length);
   }
   /**
    * Adopts the min value for each component of this vector and the given one.
    *
    * @param {Vector4} v - A vector.
    * @return {Vector4} This vector.
    */
 
 
   min(v) {
     this.x = Math.min(this.x, v.x);
     this.y = Math.min(this.y, v.y);
     this.z = Math.min(this.z, v.z);
     this.w = Math.min(this.w, v.w);
     return this;
   }
   /**
    * Adopts the max value for each component of this vector and the given one.
    *
    * @param {Vector4} v - A vector.
    * @return {Vector4} This vector.
    */
 
 
   max(v) {
     this.x = Math.max(this.x, v.x);
     this.y = Math.max(this.y, v.y);
     this.z = Math.max(this.z, v.z);
     this.w = Math.max(this.w, v.w);
     return this;
   }
   /**
    * Clamps this vector.
    *
    * @param {Vector4} min - The lower bounds. Assumed to be smaller than max.
    * @param {Vector4} max - The upper bounds. Assumed to be greater than min.
    * @return {Vector4} This vector.
    */
 
 
   clamp(min, max) {
     this.x = Math.max(min.x, Math.min(max.x, this.x));
     this.y = Math.max(min.y, Math.min(max.y, this.y));
     this.z = Math.max(min.z, Math.min(max.z, this.z));
     this.w = Math.max(min.w, Math.min(max.w, this.w));
     return this;
   }
   /**
    * Floors this vector.
    *
    * @return {Vector4} This vector.
    */
 
 
   floor() {
     this.x = Math.floor(this.x);
     this.y = Math.floor(this.y);
     this.z = Math.floor(this.z);
     this.w = Math.floor(this.w);
     return this;
   }
   /**
    * Ceils this vector.
    *
    * @return {Vector4} This vector.
    */
 
 
   ceil() {
     this.x = Math.ceil(this.x);
     this.y = Math.ceil(this.y);
     this.z = Math.ceil(this.z);
     this.w = Math.ceil(this.w);
     return this;
   }
   /**
    * Rounds this vector.
    *
    * @return {Vector4} This vector.
    */
 
 
   round() {
     this.x = Math.round(this.x);
     this.y = Math.round(this.y);
     this.z = Math.round(this.z);
     this.w = Math.round(this.w);
     return this;
   }
   /**
    * Lerps towards the given vector.
    *
    * @param {Vector4} v - The target vector.
    * @param {Number} alpha - The lerp factor.
    * @return {Vector4} This vector.
    */
 
 
   lerp(v, alpha) {
     this.x += (v.x - this.x) * alpha;
     this.y += (v.y - this.y) * alpha;
     this.z += (v.z - this.z) * alpha;
     this.w += (v.w - this.w) * alpha;
     return this;
   }
   /**
    * Sets this vector to the lerp result of the given vectors.
    *
    * @param {Vector4} v1 - A base vector.
    * @param {Vector4} v2 - The target vector.
    * @param {Number} alpha - The lerp factor.
    * @return {Vector4} This vector.
    */
 
 
   lerpVectors(v1, v2, alpha) {
     return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
   }
   /**
    * Checks if this vector equals the given one.
    *
    * @param {Vector4} v - A vector.
    * @return {Boolean} Whether this vector equals the given one.
    */
 
 
   equals(v) {
     return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
   }
 
 }
 
 /**
  * iterator-result v1.0.0 build Fri Dec 27 2019
  * https://github.com/vanruesc/iterator-result
  * Copyright 2019 Raoul van Rüschen, Zlib
  */
 
 /**
  * A basic iterator result.
  */
 class IteratorResult {
   /**
    * Constructs a new iterator result.
    *
    * @param {Object} [value=null] - A value.
    * @param {Boolean} [done=false] - Whether this result is past the end of the iterated sequence.
    */
   constructor(value = null, done = false) {
     /**
      * The value returned by the iterator.
      *
      * @type {Object}
      */
     this.value = value;
     /**
      * Whether this result is past the end of the iterated sequence.
      *
      * @type {Boolean}
      */
 
     this.done = done;
   }
   /**
    * Resets this iterator result.
    */
 
 
   reset() {
     this.value = null;
     this.done = false;
   }
 
 }
 
 /**
  * sparse-octree v6.0.2 build Sat Jan 18 2020
  * https://github.com/vanruesc/sparse-octree
  * Copyright 2020 Raoul van Rüschen
  * @license Zlib
  */
 /**
  * A binary pattern that describes the standard octant layout:
  *
  * ```text
  *    3____7
  *  2/___6/|
  *  | 1__|_5
  *  0/___4/
  * ```
  *
  * This common layout is crucial for positional assumptions.
  *
  * @type {Uint8Array[]}
  */
 
 const layout = [new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 1]), new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 1]), new Uint8Array([1, 0, 0]), new Uint8Array([1, 0, 1]), new Uint8Array([1, 1, 0]), new Uint8Array([1, 1, 1])];
 /**
  * A vector.
  *
  * @type {Vector3}
  * @private
  */
 
 
 const c$1 = new Vector3();
 /**
  * An octant.
  *
  * @implements {Node}
  */
 
 class Octant {
   /**
    * Constructs a new octant.
    *
    * @param {Vector3} [min] - The lower bounds.
    * @param {Vector3} [max] - The upper bounds.
    */
   constructor(min = new Vector3(), max = new Vector3()) {
     /**
      * The lower bounds of this octant.
      *
      * @type {Vector3}
      */
     this.min = min;
     /**
      * The upper bounds of the octant.
      *
      * @type {Vector3}
      */
 
     this.max = max;
     /**
      * The children of this octant.
      *
      * @type {Octant[]}
      */
 
     this.children = null;
   }
   /**
    * Computes the center of this octant.
    *
    * @param {Vector3} target - A target vector.
    * @return {Vector3} The center.
    */
 
 
   getCenter(target) {
     return target.addVectors(this.min, this.max).multiplyScalar(0.5);
   }
   /**
    * Computes the size of this octant.
    *
    * @param {Vector3} target - A target vector.
    * @return {Vector3} The size.
    */
 
 
   getDimensions(target) {
     return target.subVectors(this.max, this.min);
   }
   /**
    * Splits this octant into eight smaller ones.
    */
 
 
   split() {
     const min = this.min;
     const max = this.max;
     const mid = this.getCenter(c$1);
     const children = this.children = [null, null, null, null, null, null, null, null];
     let i, combination;
 
     for (i = 0; i < 8; ++i) {
       combination = layout[i];
       children[i] = new this.constructor(new Vector3(combination[0] === 0 ? min.x : mid.x, combination[1] === 0 ? min.y : mid.y, combination[2] === 0 ? min.z : mid.z), new Vector3(combination[0] === 0 ? mid.x : max.x, combination[1] === 0 ? mid.y : max.y, combination[2] === 0 ? mid.z : max.z));
     }
   }
 
 }
 /**
  * A collection of ray-point intersection data.
  */
 
 
 class RayPointIntersection {
   /**
    * Constructs new ray-point intersection data.
    *
    * @param {Number} distance - The distance from the origin of the ray to the point.
    * @param {Number} distanceToRay - The distance from the point to the ray.
    * @param {Vector3} point - The point.
    * @param {Object} [object=null] - The point's data.
    */
   constructor(distance, distanceToRay, point, object = null) {
     /**
      * The distance from the origin of the ray to the point.
      *
      * @type {Number}
      */
     this.distance = distance;
     /**
      * The shortest distance from the point to the ray.
      *
      * @type {Number}
      */
 
     this.distanceToRay = distanceToRay;
     /**
      * The point.
      *
      * @type {Vector3}
      */
 
     this.point = point;
     /**
      * The point's data.
      *
      * @type {Object}
      */
 
     this.object = object;
   }
 
 }
 /**
  * Collects points that intersect with the given ray.
  *
  * @param {PointOctant[]} octants - An array containing octants that intersect with the ray.
  * @param {Raycaster} raycaster - The raycaster.
  * @param {RayPointIntersection[]} intersects - An array to be filled with intersecting points.
  */
 
 
 function testPoints(octants, raycaster, intersects) {
   const threshold = raycaster.params.Points.threshold;
   const thresholdSq = threshold * threshold;
   let intersectPoint;
   let distance, distanceToRay;
   let rayPointDistanceSq;
   let i, j, il, jl;
   let octant, points, point;
 
   for (i = 0, il = octants.length; i < il; ++i) {
     octant = octants[i];
     points = octant.points;
 
     if (points !== null) {
       for (j = 0, jl = points.length; j < jl; ++j) {
         point = points[j];
         rayPointDistanceSq = raycaster.ray.distanceSqToPoint(point);
 
         if (rayPointDistanceSq < thresholdSq) {
           intersectPoint = raycaster.ray.closestPointToPoint(point, new Vector3());
           distance = raycaster.ray.origin.distanceTo(intersectPoint);
 
           if (distance >= raycaster.near && distance <= raycaster.far) {
             distanceToRay = Math.sqrt(rayPointDistanceSq);
             intersects.push(new RayPointIntersection(distance, distanceToRay, intersectPoint, octant.data[j]));
           }
         }
       }
     }
   }
 }
 /**
  * A container for raycasting flags.
  */
 
 
 class Flags {
   /**
    * Creates a new container for raycasting flags.
    */
   constructor() {
     /**
      * The current flags.
      *
      * @type {Number}
      */
     this.value = 0;
   }
 
 }
 /**
  * Finds the entry plane of the first octant that a ray travels through.
  *
  * Determining the first octant requires knowing which of the t0s is the
  * largest. The tms of the other axes must also be compared against that
  * largest t0.
  *
  * @param {Number} tx0 - Ray projection parameter.
  * @param {Number} ty0 - Ray projection parameter.
  * @param {Number} tz0 - Ray projection parameter.
  * @param {Number} txm - Ray projection parameter mean.
  * @param {Number} tym - Ray projection parameter mean.
  * @param {Number} tzm - Ray projection parameter mean.
  * @return {Number} The index of the first octant that the ray travels through.
  */
 
 
 function findEntryOctant(tx0, ty0, tz0, txm, tym, tzm) {
   let entry = 0; // Find the entry plane.
 
   if (tx0 > ty0 && tx0 > tz0) {
     // YZ-plane.
     if (tym < tx0) {
       entry |= 2;
     }
 
     if (tzm < tx0) {
       entry |= 1;
     }
   } else if (ty0 > tz0) {
     // XZ-plane.
     if (txm < ty0) {
       entry |= 4;
     }
 
     if (tzm < ty0) {
       entry |= 1;
     }
   } else {
     // XY-plane.
     if (txm < tz0) {
       entry |= 4;
     }
 
     if (tym < tz0) {
       entry |= 2;
     }
   }
 
   return entry;
 }
 /**
  * A lookup-table containing octant ids. Used to determine the exit plane from
  * an octant.
  *
  * @type {Uint8Array[]}
  * @private
  */
 
 
 const octantTable = [new Uint8Array([4, 2, 1]), new Uint8Array([5, 3, 8]), new Uint8Array([6, 8, 3]), new Uint8Array([7, 8, 8]), new Uint8Array([8, 6, 5]), new Uint8Array([8, 7, 8]), new Uint8Array([8, 8, 7]), new Uint8Array([8, 8, 8])];
 /**
  * Finds the next octant that intersects with the ray based on the exit plane of
  * the current one.
  *
  * @param {Number} currentOctant - The index of the current octant.
  * @param {Number} tx1 - Ray projection parameter.
  * @param {Number} ty1 - Ray projection parameter.
  * @param {Number} tz1 - Ray projection parameter.
  * @return {Number} The index of the next octant that the ray travels through.
  */
 
 function findNextOctant(currentOctant, tx1, ty1, tz1) {
   let min;
   let exit = 0; // Find the exit plane.
 
   if (tx1 < ty1) {
     min = tx1;
     exit = 0; // YZ-plane.
   } else {
     min = ty1;
     exit = 1; // XZ-plane.
   }
 
   if (tz1 < min) {
     exit = 2; // XY-plane.
   }
 
   return octantTable[currentOctant][exit];
 }
 /**
  * A vector.
  *
  * @type {Vector3}
  * @private
  */
 
 
 const v$1 = new Vector3();
 /**
  * A box.
  *
  * @type {Box3}
  * @private
  */
 
 const b = new Box3();
 /**
  * A box.
  *
  * @type {Box3}
  * @private
  */
 
 const d = new Box3();
 /**
  * A ray.
  *
  * @type {Ray}
  * @private
  */
 
 const r = new Ray();
 /**
  * Calculates ray projection parameters for the given octree and ray setup.
  *
  * @param {Octree} octree - The octree.
  * @param {Ray} ray - A ray.
  * @param {Flags} flags - Raycasting flags.
  * @return {Number[]} The ray parameters tx0, ty0, tz0, tx1, ty1 and tz1, in that order, or null if the ray doesn't hit the octree.
  */
 
 function intersectOctree(octree, ray, flags) {
   // Translate the octant extents to the scene origin.
   const min = b.min.set(0, 0, 0);
   const max = b.max.subVectors(octree.max, octree.min);
   const dimensions = octree.getDimensions(d.min);
   const halfDimensions = d.max.copy(dimensions).multiplyScalar(0.5);
   const origin = r.origin.copy(ray.origin);
   const direction = r.direction.copy(ray.direction);
   let invDirX, invDirY, invDirZ;
   let tx0, tx1, ty0, ty1, tz0, tz1; // Translate the ray to the center of the octant.
 
   origin.sub(octree.getCenter(v$1)).add(halfDimensions); // Reset all flags.
 
   flags.value = 0; // Handle rays with negative directions.
 
   if (direction.x < 0.0) {
     origin.x = dimensions.x - origin.x;
     direction.x = -direction.x;
     flags.value |= 4;
   }
 
   if (direction.y < 0.0) {
     origin.y = dimensions.y - origin.y;
     direction.y = -direction.y;
     flags.value |= 2;
   }
 
   if (direction.z < 0.0) {
     origin.z = dimensions.z - origin.z;
     direction.z = -direction.z;
     flags.value |= 1;
   } // Improve IEEE double stability.
 
 
   invDirX = 1.0 / direction.x;
   invDirY = 1.0 / direction.y;
   invDirZ = 1.0 / direction.z; // Project the ray to the octant's boundaries.
 
   tx0 = (min.x - origin.x) * invDirX;
   tx1 = (max.x - origin.x) * invDirX;
   ty0 = (min.y - origin.y) * invDirY;
   ty1 = (max.y - origin.y) * invDirY;
   tz0 = (min.z - origin.z) * invDirZ;
   tz1 = (max.z - origin.z) * invDirZ; // Check if the ray hits the octree.
 
   return Math.max(Math.max(tx0, ty0), tz0) < Math.min(Math.min(tx1, ty1), tz1) ? [tx0, ty0, tz0, tx1, ty1, tz1] : null;
 }
 /**
  * Raycasting flags.
  *
  * @type {Flags}
  */
 
 
 const flags = new Flags();
 /**
  * Finds all octants that intersect with the given ray.
  *
  * @private
  * @param {Octant} octant - The current octant.
  * @param {Number} tx0 - A ray projection parameter.
  * @param {Number} ty0 - A ray projection parameter.
  * @param {Number} tz0 - A ray projection parameter.
  * @param {Number} tx1 - A ray projection parameter.
  * @param {Number} ty1 - A ray projection parameter.
  * @param {Number} tz1 - A ray projection parameter.
  * @param {Array} intersects - An array to be filled with the intersecting octants.
  */
 
 function raycastOctant(octant, tx0, ty0, tz0, tx1, ty1, tz1, intersects) {
   if (tx1 >= 0.0 && ty1 >= 0.0 && tz1 >= 0.0) {
     const children = octant.children;
 
     if (children === null) {
       // Leaf.
       intersects.push(octant);
     } else {
       // Compute means.
       const txm = 0.5 * (tx0 + tx1);
       const tym = 0.5 * (ty0 + ty1);
       const tzm = 0.5 * (tz0 + tz1);
       const f = flags.value;
       let currentOctant = findEntryOctant(tx0, ty0, tz0, txm, tym, tzm);
       /* The possibilities for the next node are passed in the same respective
       order as the t-values. Hence, if the first value is found to be the
       greatest, the fourth one will be returned. If the second value is the
       greatest, the fifth one will be returned, etc. */
 
       do {
         switch (currentOctant) {
           case 0:
             raycastOctant(children[f], tx0, ty0, tz0, txm, tym, tzm, intersects);
             currentOctant = findNextOctant(currentOctant, txm, tym, tzm);
             break;
 
           case 1:
             raycastOctant(children[f ^ 1], tx0, ty0, tzm, txm, tym, tz1, intersects);
             currentOctant = findNextOctant(currentOctant, txm, tym, tz1);
             break;
 
           case 2:
             raycastOctant(children[f ^ 2], tx0, tym, tz0, txm, ty1, tzm, intersects);
             currentOctant = findNextOctant(currentOctant, txm, ty1, tzm);
             break;
 
           case 3:
             raycastOctant(children[f ^ 3], tx0, tym, tzm, txm, ty1, tz1, intersects);
             currentOctant = findNextOctant(currentOctant, txm, ty1, tz1);
             break;
 
           case 4:
             raycastOctant(children[f ^ 4], txm, ty0, tz0, tx1, tym, tzm, intersects);
             currentOctant = findNextOctant(currentOctant, tx1, tym, tzm);
             break;
 
           case 5:
             raycastOctant(children[f ^ 5], txm, ty0, tzm, tx1, tym, tz1, intersects);
             currentOctant = findNextOctant(currentOctant, tx1, tym, tz1);
             break;
 
           case 6:
             raycastOctant(children[f ^ 6], txm, tym, tz0, tx1, ty1, tzm, intersects);
             currentOctant = findNextOctant(currentOctant, tx1, ty1, tzm);
             break;
 
           case 7:
             raycastOctant(children[f ^ 7], txm, tym, tzm, tx1, ty1, tz1, intersects); // Far top right octant. No other octants can be reached from here.
 
             currentOctant = 8;
             break;
         }
       } while (currentOctant < 8);
     }
   }
 }
 /**
  * A raycaster for pointer-based octrees.
  *
  * Reference:
  *  "An Efficient Parametric Algorithm for Octree Traversal"
  *  by J. Revelles et al. (2000)
  */
 
 
 class OctreeRaycaster {
   /**
    * Finds (pseudo) leaf octants that intersect with the given ray.
    *
    * @param {Octree} octree - An octree.
    * @param {Ray} ray - A ray.
    * @param {Octant[]} [intersects] - An optional target list to be filled with the intersecting octants.
    * @return {Octant[]} The intersecting octants. Sorted by distance, closest first.
    */
   static intersectOctree(octree, ray, intersects = []) {
     const parameters = intersectOctree(octree, ray, flags);
 
     if (parameters !== null) {
       raycastOctant(octree.root, ...parameters, intersects);
     }
   }
 
 }
 /**
  * A 3D box.
  *
  * @type {Box3}
  * @private
  */
 
 
 const b$1 = new Box3();
 /**
  * An octree iterator.
  *
  * @implements {Iterator}
  * @implements {Iterable}
  */
 
 class OctreeIterator {
   /**
    * Constructs a new octant iterator.
    *
    * @param {Octree} octree - An octree.
    * @param {Frustum|Box3} [region=null] - A cull region.
    */
   constructor(octree, region = null) {
     /**
      * The octree.
      *
      * @type {Octree}
      * @private
      */
     this.octree = octree;
     /**
      * A region used for octree culling.
      *
      * @type {Frustum|Box3}
      */
 
     this.region = region;
     /**
      * Whether this iterator should respect the cull region.
      *
      * @type {Boolean}
      */
 
     this.cull = region !== null;
     /**
      * An iterator result.
      *
      * @type {IteratorResult}
      * @private
      */
 
     this.result = new IteratorResult();
     /**
      * An octant trace.
      *
      * @type {Octant[]}
      * @private
      */
 
     this.trace = null;
     /**
      * Iteration indices.
      *
      * @type {Number[]}
      * @private
      */
 
     this.indices = null;
     this.reset();
   }
   /**
    * Resets this iterator.
    *
    * @return {OctreeIterator} This iterator.
    */
 
 
   reset() {
     const root = this.octree.root;
     this.trace = [];
     this.indices = [];
 
     if (root !== null) {
       b$1.min = root.min;
       b$1.max = root.max;
 
       if (!this.cull || this.region.intersectsBox(b$1)) {
         this.trace.push(root);
         this.indices.push(0);
       }
     }
 
     this.result.reset();
     return this;
   }
   /**
    * Iterates over the leaf octants.
    *
    * @return {IteratorResult} The next leaf octant.
    */
 
 
   next() {
     const cull = this.cull;
     const region = this.region;
     const indices = this.indices;
     const trace = this.trace;
     let octant = null;
     let depth = trace.length - 1;
     let index, children, child;
 
     while (octant === null && depth >= 0) {
       index = indices[depth]++;
       children = trace[depth].children;
 
       if (index < 8) {
         if (children !== null) {
           child = children[index];
 
           if (cull) {
             b$1.min = child.min;
             b$1.max = child.max;
 
             if (!region.intersectsBox(b$1)) {
               // Cull this octant.
               continue;
             }
           }
 
           trace.push(child);
           indices.push(0);
           ++depth;
         } else {
           octant = trace.pop();
           indices.pop();
         }
       } else {
         trace.pop();
         indices.pop();
         --depth;
       }
     }
 
     this.result.value = octant;
     this.result.done = octant === null;
     return this.result;
   }
   /**
    * Called when this iterator will no longer be run to completion.
    *
    * @param {Object} value - An interator result value.
    * @return {IteratorResult} - A premature completion result.
    */
 
 
   return(value) {
     this.result.value = value;
     this.result.done = true;
     return this.result;
   }
   /**
    * Returns this iterator.
    *
    * @return {Iterator} An iterator.
    */
 
 
   [Symbol.iterator]() {
     return this;
   }
 
 }
 /**
  * A 3D box.
  *
  * @type {Box3}
  * @private
  */
 
 
 const b$2 = new Box3();
 /**
  * Recursively calculates the depth of the given octree.
  *
  * @private
  * @param {Node} octant - An octant.
  * @return {Number} The depth.
  */
 
 function getDepth(octant) {
   const children = octant.children;
   let result = 0;
   let i, l, d;
 
   if (children !== null) {
     for (i = 0, l = children.length; i < l; ++i) {
       d = 1 + getDepth(children[i]);
 
       if (d > result) {
         result = d;
       }
     }
   }
 
   return result;
 }
 /**
  * Recursively collects octants that lie inside the specified region.
  *
  * @private
  * @param {Node} octant - An octant.
  * @param {Frustum|Box3} region - A region.
  * @param {Node[]} result - A list to be filled with octants that intersect with the region.
  */
 
 
 function cull(octant, region, result) {
   const children = octant.children;
   let i, l;
   b$2.min = octant.min;
   b$2.max = octant.max;
 
   if (region.intersectsBox(b$2)) {
     if (children !== null) {
       for (i = 0, l = children.length; i < l; ++i) {
         cull(children[i], region, result);
       }
     } else {
       result.push(octant);
     }
   }
 }
 /**
  * Recursively fetches all octants with the specified depth level.
  *
  * @private
  * @param {Node} octant - An octant.
  * @param {Number} level - The target depth level.
  * @param {Number} depth - The current depth level.
  * @param {Node[]} result - A list to be filled with the identified octants.
  */
 
 
 function findNodesByLevel(octant, level, depth, result) {
   const children = octant.children;
   let i, l;
 
   if (depth === level) {
     result.push(octant);
   } else if (children !== null) {
     ++depth;
 
     for (i = 0, l = children.length; i < l; ++i) {
       findNodesByLevel(children[i], level, depth, result);
     }
   }
 }
 /**
  * A pointer-based octree that subdivides space for fast spatial searches.
  *
  * @implements {Iterable}
  * @implements {Node}
  * @implements {Tree}
  */
 
 
 class Octree {
   /**
    * Constructs a new octree.
    *
    * @param {Node} root - The root node. See {@link Octant} or {@link CubicOctant}.
    */
   constructor(root) {
     /**
      * The root octant.
      *
      * @type {Node}
      * @protected
      */
     this.root = root;
   }
   /**
    * The lower bounds of the root octant.
    *
    * @type {Vector3}
    */
 
 
   get min() {
     return this.root.min;
   }
   /**
    * The upper bounds of the root octant.
    *
    * @type {Vector3}
    */
 
 
   get max() {
     return this.root.max;
   }
   /**
    * The children of the root node.
    *
    * @type {Node[]}
    */
 
 
   get children() {
     return this.root.children;
   }
   /**
    * Calculates the center of this octree.
    *
    * @param {Vector3} target - A target vector.
    * @return {Vector3} A vector that describes the center of this octree.
    */
 
 
   getCenter(target) {
     return this.root.getCenter(target);
   }
   /**
    * Calculates the size of this octree.
    *
    * @param {Vector3} target - A target vector.
    * @return {Vector3} A vector that describes the size of this octree.
    */
 
 
   getDimensions(target) {
     return this.root.getDimensions(target);
   }
   /**
    * Recursively collects nodes that intersect with the specified region.
    *
    * @param {Frustum|Box3} region - A region.
    * @return {Node[]} The nodes.
    */
 
 
   cull(region) {
     const result = [];
     cull(this.root, region, result);
     return result;
   }
   /**
    * Calculates the current depth of this octree.
    *
    * @return {Number} The depth.
    */
 
 
   getDepth() {
     return getDepth(this.root);
   }
   /**
    * Fetches all nodes of a specific depth level.
    *
    * @param {Number} level - The depth level.
    * @return {Node[]} The nodes.
    */
 
 
   findNodesByLevel(level) {
     const result = [];
     findNodesByLevel(this.root, level, 0, result);
     return result;
   }
   /**
    * Finds the nodes that intersect with the given ray. The intersecting
    * nodes are sorted by distance, closest first.
    *
    * @param {Raycaster} raycaster - A raycaster.
    * @param {Node[]} [intersects] - An optional target list to be filled with the intersecting nodes.
    * @return {Node[]} The intersecting nodes.
    */
 
 
   raycast(raycaster, intersects = []) {
     OctreeRaycaster.intersectOctree(this, raycaster.ray, intersects);
     return intersects;
   }
   /**
    * Returns an iterator that traverses the octree and returns leaf nodes.
    *
    * When a cull region is provided, the iterator will only return leaves that
    * intersect with that region.
    *
    * @param {Frustum|Box3} [region] - A cull region.
    * @return {Iterator} An iterator.
    */
 
 
   leaves(region) {
     return new OctreeIterator(this, region);
   }
   /**
    * Returns an iterator that traverses the octree and returns all leaf nodes.
    *
    * @return {Iterator} An iterator.
    */
 
 
   [Symbol.iterator]() {
     return new OctreeIterator(this);
   }
 
 }
 /**
  * A point.
  *
  * @type {Vector3}
  * @private
  */
 
 
 const p = new Vector3();
 /**
  * An octant that maintains points.
  */
 
 class PointOctant extends Octant {
   /**
    * Constructs a new point octant.
    *
    * @param {Vector3} [min] - The lower bounds.
    * @param {Vector3} [max] - The upper bounds.
    */
   constructor(min, max) {
     super(min, max);
     /**
      * The points.
      *
      * @type {Vector3[]}
      */
 
     this.points = null;
     /**
      * Point data.
      *
      * @type {Array}
      */
 
     this.data = null;
   }
   /**
    * Calculates the distance squared from this octant to the given point.
    *
    * @param {Vector3} point - A point.
    * @return {Number} The distance squared.
    */
 
 
   distanceToSquared(point) {
     const clampedPoint = p.copy(point).clamp(this.min, this.max);
     return clampedPoint.sub(point).lengthSquared();
   }
   /**
    * Calculates the distance squared from the center of this octant to the given
    * point.
    *
    * @param {Vector3} point - A point.
    * @return {Number} The distance squared.
    */
 
 
   distanceToCenterSquared(point) {
     const center = this.getCenter(p);
     const dx = point.x - center.x;
     const dy = point.y - center.x;
     const dz = point.z - center.z;
     return dx * dx + dy * dy + dz * dz;
   }
   /**
    * Checks if the given point lies inside this octant's boundaries.
    *
    * This method can also be used to check if this octant intersects a sphere by
    * providing a radius as bias.
    *
    * @param {Vector3} point - A point.
    * @param {Number} bias - A padding that extends the boundaries temporarily.
    * @return {Boolean} Whether the given point lies inside this octant.
    */
 
 
   contains(point, bias) {
     const min = this.min;
     const max = this.max;
     return point.x >= min.x - bias && point.y >= min.y - bias && point.z >= min.z - bias && point.x <= max.x + bias && point.y <= max.y + bias && point.z <= max.z + bias;
   }
   /**
    * Redistributes the points of this octant to its children.
    *
    * Has no effect if there are no points or if this octant has no children.
    *
    * @param {Number} bias - A proximity threshold.
    */
 
 
   redistribute(bias) {
     const children = this.children;
     const points = this.points;
     const data = this.data;
     let i, j, il, jl;
     let child, point, entry;
 
     if (children !== null && points !== null) {
       for (i = 0, il = points.length; i < il; ++i) {
         point = points[i];
         entry = data[i];
 
         for (j = 0, jl = children.length; j < jl; ++j) {
           child = children[j];
 
           if (child.contains(point, bias)) {
             if (child.points === null) {
               child.points = [];
               child.data = [];
             }
 
             child.points.push(point);
             child.data.push(entry);
             break;
           }
         }
       }
 
       this.points = null;
       this.data = null;
     }
   }
   /**
    * Deletes all child nodes and collects their points.
    */
 
 
   merge() {
     const children = this.children;
 
     if (children !== null) {
       let points = [];
       let data = [];
       let i, l, child;
 
       for (i = 0, l = children.length; i < l; ++i) {
         child = children[i];
 
         if (child.points !== null) {
           points = points.concat(child.points);
           data = data.concat(child.data);
         }
       }
       /** @ignore */
 
 
       this.children = null;
       this.points = points;
       this.data = data;
     }
   }
 
 }
 /**
  * Recursively counts how many points are in the given octant.
  *
  * @private
  * @param {Octant} octant - An octant.
  * @return {Number} The amount of points.
  */
 
 
 function countPoints(octant) {
   const children = octant.children;
   let result = 0;
   let i, l;
 
   if (children !== null) {
     for (i = 0, l = children.length; i < l; ++i) {
       result += countPoints(children[i]);
     }
   } else if (octant.points !== null) {
     result = octant.points.length;
   }
 
   return result;
 }
 /**
  * Recursively inserts a point into the octree.
  *
  * @private
  * @param {Vector3} point - A point.
  * @param {Object} data - An object that the point represents.
  * @param {Octree} octree - The octree.
  * @param {Octant} octant - The current octant.
  * @param {Number} depth - The current depth.
  * @return {Boolean} Whether the operation was successful.
  */
 
 
 function insert(point, data, octree, octant, depth) {
   let children = octant.children;
   let exists = false;
   let done = false;
   let i, l;
 
   if (octant.contains(point, octree.bias)) {
     if (children === null) {
       if (octant.points === null) {
         octant.points = [];
         octant.data = [];
       } else {
         for (i = 0, l = octant.points.length; !exists && i < l; ++i) {
           exists = octant.points[i].equals(point);
         }
       }
 
       if (exists) {
         octant.data[i - 1] = data;
         done = true;
       } else if (octant.points.length < octree.maxPoints || depth === octree.maxDepth) {
         octant.points.push(point.clone());
         octant.data.push(data);
         ++octree.pointCount;
         done = true;
       } else {
         octant.split();
         octant.redistribute(octree.bias);
         children = octant.children;
       }
     }
 
     if (children !== null) {
       ++depth;
 
       for (i = 0, l = children.length; !done && i < l; ++i) {
         done = insert(point, data, octree, children[i], depth);
       }
     }
   }
 
   return done;
 }
 /**
  * Recursively finds a point in the octree and removes it.
  *
  * @private
  * @param {Vector3} point - A point.
  * @param {Octree} octree - The octree.
  * @param {Octant} octant - The current octant.
  * @param {Octant} parent - The parent of the current octant.
  * @return {Object} The data entry of the removed point or null if it didn't exist.
  */
 
 
 function remove(point, octree, octant, parent) {
   const children = octant.children;
   let result = null;
   let i, l;
   let points, data, last;
 
   if (octant.contains(point, octree.bias)) {
     if (children !== null) {
       for (i = 0, l = children.length; result === null && i < l; ++i) {
         result = remove(point, octree, children[i], octant);
       }
     } else if (octant.points !== null) {
       points = octant.points;
       data = octant.data;
 
       for (i = 0, l = points.length; i < l; ++i) {
         if (points[i].equals(point)) {
           last = l - 1;
           result = data[i]; // If the point is NOT the last one in the array:
 
           if (i < last) {
             // Overwrite with the last point and data entry.
             points[i] = points[last];
             data[i] = data[last];
           } // Drop the last entry.
 
 
           points.pop();
           data.pop();
           --octree.pointCount;
 
           if (parent !== null && countPoints(parent) <= octree.maxPoints) {
             parent.merge();
           }
 
           break;
         }
       }
     }
   }
 
   return result;
 }
 /**
  * Recursively finds a point in the octree and fetches the associated data.
  *
  * @private
  * @param {Vector3} point - A point.
  * @param {Octree} octree - The octree.
  * @param {Octant} octant - The current octant octant.
  * @return {Object} The data entry that is associated with the given point or null if it doesn't exist.
  */
 
 
 function get(point, octree, octant) {
   const children = octant.children;
   let result = null;
   let i, l;
   let points;
 
   if (octant.contains(point, octree.bias)) {
     if (children !== null) {
       for (i = 0, l = children.length; result === null && i < l; ++i) {
         result = get(point, octree, children[i]);
       }
     } else if (octant.points !== null) {
       points = octant.points;
 
       for (i = 0, l = points.length; result === null && i < l; ++i) {
         if (point.equals(points[i])) {
           result = octant.data[i];
         }
       }
     }
   }
 
   return result;
 }
 /**
  * Recursively moves an existing point to a new position.
  *
  * @private
  * @param {Vector3} point - The point.
  * @param {Vector3} position - The new position.
  * @param {Octree} octree - The octree.
  * @param {Octant} octant - The current octant.
  * @param {Octant} parent - The parent of the current octant.
  * @param {Number} depth - The current depth.
  * @return {Object} The data entry of the updated point or null if it didn't exist.
  */
 
 
 function move(point, position, octree, octant, parent, depth) {
   const children = octant.children;
   let result = null;
   let i, l;
   let points;
 
   if (octant.contains(point, octree.bias)) {
     if (octant.contains(position, octree.bias)) {
       // The point and the new position both fall into the current octant.
       if (children !== null) {
         ++depth;
 
         for (i = 0, l = children.length; result === null && i < l; ++i) {
           result = move(point, position, octree, children[i], octant, depth);
         }
       } else if (octant.points !== null) {
         // No divergence - the point can be updated in place.
         points = octant.points;
 
         for (i = 0, l = points.length; i < l; ++i) {
           if (point.equals(points[i])) {
             // The point exists! Update its position.
             points[i].copy(position);
             result = octant.data[i];
             break;
           }
         }
       }
     } else {
       // Retrieve the point and remove it.
       result = remove(point, octree, octant, parent); // Go back to the parent octant and add the updated point.
 
       insert(position, result, octree, parent, depth - 1);
     }
   }
 
   return result;
 }
 /**
  * Recursively finds the closest point to the given one.
  *
  * @private
  * @param {Vector3} point - The point.
  * @param {Number} maxDistance - The maximum distance.
  * @param {Boolean} skipSelf - Whether a point that is exactly at the given position should be skipped.
  * @param {Octant} octant - The current octant.
  * @return {Object} An object representing the nearest point or null if there is none.
  * @property {Vector3} point - The nearest point.
  * @property {Object} data - The data that belongs to the point.
  * @property {Number} distance - The distance to the given point.
  */
 
 
 function findNearestPoint(point, maxDistance, skipSelf, octant) {
   let result = null;
   let bestDistance = maxDistance;
   let i, l;
 
   if (octant.children !== null) {
     // Sort the children: smallest distance to the point first, ASC.
     const sortedChildren = octant.children.map(child => {
       // Precompute distances.
       return {
         octant: child,
         distance: child.distanceToCenterSquared(point)
       };
     }).sort((a, b) => a.distance - b.distance);
     let child, intermediateResult; // Traverse from closest to furthest.
 
     for (i = 0, l = sortedChildren.length; i < l; ++i) {
       child = sortedChildren[i].octant;
 
       if (child.contains(point, bestDistance)) {
         intermediateResult = findNearestPoint(point, bestDistance, skipSelf, child);
 
         if (intermediateResult !== null) {
           bestDistance = intermediateResult.distance;
           result = intermediateResult;
 
           if (bestDistance === 0.0) {
             break;
           }
         }
       }
     }
   } else if (octant.points !== null) {
     const points = octant.points;
     let index = -1;
     let distance;
 
     for (i = 0, l = points.length; i < l; ++i) {
       if (points[i].equals(point)) {
         if (!skipSelf) {
           bestDistance = 0.0;
           index = i;
           break;
         }
       } else {
         distance = point.distanceTo(points[i]);
 
         if (distance < bestDistance) {
           bestDistance = distance;
           index = i;
         }
       }
     }
 
     if (index >= 0) {
       result = {
         point: points[index],
         data: octant.data[index],
         distance: bestDistance
       };
     }
   }
 
   return result;
 }
 /**
  * Recursively finds points that are inside the specified radius around a given
  * position.
  *
  * @private
  * @param {Vector3} point - A position.
  * @param {Number} radius - A radius.
  * @param {Boolean} skipSelf - Whether a point that is exactly at the given position should be skipped.
  * @param {Octant} octant - The current octant.
  * @param {Array<Object>} result - An array to be filled with objects.
  * @property {Vector3} point - A point.
  * @property {Object} data - The data that belongs to the point.
  */
 
 
 function findPoints(point, radius, skipSelf, octant, result) {
   const children = octant.children;
   let i, l;
 
   if (children !== null) {
     let child;
 
     for (i = 0, l = children.length; i < l; ++i) {
       child = children[i];
 
       if (child.contains(point, radius)) {
         findPoints(point, radius, skipSelf, child, result);
       }
     }
   } else if (octant.points !== null) {
     const points = octant.points;
     const rSq = radius * radius;
     let p;
 
     for (i = 0, l = points.length; i < l; ++i) {
       p = points[i];
 
       if (p.equals(point)) {
         if (!skipSelf) {
           result.push({
             point: p.clone(),
             data: octant.data[i]
           });
         }
       } else if (p.distanceToSquared(point) <= rSq) {
         result.push({
           point: p.clone(),
           data: octant.data[i]
         });
       }
     }
   }
 }
 /**
  * An octree that manages points.
  */
 
 
 class PointOctree extends Octree {
   /**
    * Constructs a new point octree.
    *
    * @param {Vector3} [min] - The lower bounds of the tree.
    * @param {Vector3} [max] - The upper bounds of the tree.
    * @param {Number} [bias=0.0] - An octant boundary bias. The octree is considered "loose" with a bias greater than 0.
    * @param {Number} [maxPoints=8] - Number of distinct points per octant before it splits up.
    * @param {Number} [maxDepth=8] - The maximum tree depth level, starting at 0.
    */
   constructor(min, max, bias = 0.0, maxPoints = 8, maxDepth = 8) {
     super(new PointOctant(min, max));
     /**
      * An octant boundary bias.
      *
      * @type {Number}
      * @private
      */
 
     this.bias = Math.max(0.0, bias);
     /**
      * The number of points per octant before a split occurs.
      *
      * This value works together with the maximum depth as a secondary limiting
      * factor. Smaller values cause splits to occur earlier which results in a
      * faster and deeper tree growth.
      *
      * @type {Number}
      * @private
      */
 
     this.maxPoints = Math.max(1, Math.round(maxPoints));
     /**
      * The maximum tree depth level.
      *
      * It's possible to use Infinity, but keep in mind that allowing infinitely
      * small octants can have a severely negative impact on performance.
      * Finding a value that works best for a specific scene is advisable.
      *
      * @type {Number}
      * @private
      */
 
     this.maxDepth = Math.max(0, Math.round(maxDepth));
     /**
      * The amount of points that are currently in this octree.
      *
      * @type {Number}
      */
 
     this.pointCount = 0;
   }
   /**
    * Counts how many points are in the given octant.
    *
    * @param {Octant} octant - An octant.
    * @return {Number} The amount of points.
    */
 
 
   countPoints(octant) {
     return countPoints(octant);
   }
   /**
    * Puts a point into the octree.
    *
    * @param {Vector3} point - A point. If it's already in the octree, the data entry will be updated.
    * @param {Object} data - A data object that belongs to the point.
    * @return {Boolean} Whether the operation was successful.
    */
 
 
   insert(point, data) {
     return insert(point, data, this, this.root, 0);
   }
   /**
    * Removes a point from the tree.
    *
    * @param {Vector3} point - A point.
    * @return {Object} The data entry of the removed point or null if it didn't exist.
    */
 
 
   remove(point) {
     return remove(point, this, this.root, null);
   }
   /**
    * Retrieves the data of the specified point.
    *
    * @param {Vector3} point - A position.
    * @return {Object} The data entry that is associated with the given point or null if it doesn't exist.
    */
 
 
   get(point) {
     return get(point, this, this.root);
   }
   /**
    * Moves an existing point to a new position. Has no effect if the point
    * doesn't exist.
    *
    * @param {Vector3} point - The point.
    * @param {Vector3} position - The new position.
    * @return {Object} The data entry of the updated point or null if it didn't exist.
    */
 
 
   move(point, position) {
     return move(point, position, this, this.root, null, 0);
   }
   /**
    * Finds the closest point to the given one.
    *
    * @param {Vector3} point - A point.
    * @param {Number} [maxDistance=Infinity] - An upper limit for the distance between the points.
    * @param {Boolean} [skipSelf=false] - Whether a point that is exactly at the given position should be skipped.
    * @return {Object} An object representing the nearest point or null if there is none.
    * @property {Vector3} point - The nearest point.
    * @property {Object} data - The data that belongs to the point.
    * @property {Number} distance - The distance to the given point.
    */
 
 
   findNearestPoint(point, maxDistance = Infinity, skipSelf = false) {
     const result = findNearestPoint(point, maxDistance, skipSelf, this.root);
 
     if (result !== null) {
       result.point = result.point.clone();
     }
 
     return result;
   }
   /**
    * Finds points that are in the specified radius around the given position.
    *
    * @param {Vector3} point - A position.
    * @param {Number} radius - A radius.
    * @param {Boolean} [skipSelf=false] - Whether a point that is exactly at the given position should be skipped.
    * @return {Array<Object>} An array of objects.
    * @property {Vector3} point - A point.
    * @property {Object} data - The data that belongs to the point.
    */
 
 
   findPoints(point, radius, skipSelf = false) {
     const result = [];
     findPoints(point, radius, skipSelf, this.root, result);
     return result;
   }
   /**
    * Finds the points that intersect with the given ray.
    *
    * @param {Raycaster} raycaster - The raycaster.
    * @param {Array} [intersects] - An array to be filled with the intersecting points.
    * @return {RayPointIntersection[]} The intersecting points.
    */
 
 
   raycast(raycaster, intersects = []) {
     const octants = super.raycast(raycaster);
 
     if (octants.length > 0) {
       testPoints(octants, raycaster, intersects);
     }
 
     return intersects;
   }
 
 }
 
 /**
  * Mixin providing methods and properties
  * for handling Level Of Detail functionallity.
  * @mixin
  */
 var levelOfDetail = {
   LOD: {
     maxPoints: 1,
     maxDepth: 80
   },
 
   /**
    * Set the vanted level of detail (LOD).
    * @param {number} [maxPoints=1] Number of distinct points per octant in octree before it splits up.
    * @param {number} [maxDepth=8] The maximum octree depth level, starting at 0.
    */
   setLOD: function setLOD(maxPoints, maxDepth) {
     if (typeof maxPoints !== 'undefined') {
       this.LOD.maxPoints = maxPoints;
     }
 
     if (typeof maxDepth !== 'undefined') {
       this.LOD.maxDepth = maxDepth;
     }
   },
 
   /**
    * Get the Level Of Detail (LOD) value.
    */
   getLOD: function getLOD() {
     return this.LOD;
   }
 };
 
 var ArrayLoader = /*#__PURE__*/function (_Loader) {
   _inherits(ArrayLoader, _Loader);
 
   var _super = _createSuper(ArrayLoader);
 
   /**
    * Create an ArrayLoader.
    * @classdesc Class for loading voxel data stored as a 3D array.
    * @extends Loader
    * @mixes levelOfDetail
    * @param {LoadingManager} manager
    */
   function ArrayLoader(manager) {
     var _this;
 
     _classCallCheck(this, ArrayLoader);
 
     _this = _super.call(this, manager);
     autoBind(_assertThisInitialized(_this));
     Object.assign(_assertThisInitialized(_this), levelOfDetail);
     return _this;
   }
   /**
    * Loads and parses a 3D array stored in a JS file from a URL.
    * @param {String} url URL to the JS file with array.
    * @param {Function} [onLoad] Callback invoked with the loaded object.
    * @param {Function} [onProgress] Callback for download progress.
    * @param {Function} [onError] Callback for download errors.
    */
 
 
   _createClass(ArrayLoader, [{
     key: "load",
     value: function load(url, onLoad, onProgress, onError) {
       var scope = this;
       var loader = new FileLoader(this.manager);
       loader.setPath(this.path); //loader.setResponseType('arraybuffer')
 
       loader.load(url, function (data) {
         scope.parse(data).then(function (octree) {
           return onLoad(octree);
         })["catch"](function (err) {
           return console.error(err);
         });
       }, onProgress, onError);
     }
     /**
      * Parses a 3D array.
       * @param {Object} data The volume data to parse.
       * @param {number[][][]} data.voxels The voxel data.
       * @param {number[][][][]} [data.colors=null] The color data.
      * @return {Promise<PointOctree>} Promise with an octree filled with voxel data.
      */
 
   }, {
     key: "parse",
     value: function parse() {
       var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
       var voxels = data.voxels;
       var colors = data.colors;
       var that = this;
       return new Promise(function (resolve, reject) {
         var minX = -(voxels[0][0].length - 1) / 2;
         var maxX = (voxels[0][0].length - 1) / 2;
         var minZ = -(voxels.length - 1) / 2;
         var maxZ = (voxels.length - 1) / 2;
         var minY = -(voxels[0].length - 1) / 2;
         var maxY = (voxels[0].length - 1) / 2;
         var min = new Vector3$1(minX, minY, minZ);
         var max = new Vector3$1(maxX, maxY, maxZ);
         var octree = new PointOctree(min, max, 0, that.LOD.maxPoints, that.LOD.maxDepth);
         var voxelData = {};
 
         for (var i = 0; i < voxels.length; i++) {
           // z-axis
           for (var j = 0; j < voxels[i].length; j++) {
             // y-axis
             for (var k = 0; k < voxels[i][j].length; k++) {
               // x-axis
               var element = voxels[i][j][k];
 
               if (element === 1) {
                 var x = k - (voxels[i][j].length - 1) / 2;
                 var y = j - (voxels[i].length - 1) / 2;
                 var z = i - (voxels.length - 1) / 2;
 
                 if (colors) {
                   var r = colors[i][j][k][0];
                   var g = colors[i][j][k][1];
                   var b = colors[i][j][k][2];
                   voxelData = {
                     color: {
                       r: r,
                       g: g,
                       b: b
                     }
                   };
                 }
 
                 octree.insert(new Vector3$1(x, y, z), voxelData);
               }
             }
           }
         }
 
         resolve(octree);
       });
     }
   }]);
 
   return ArrayLoader;
 }(Loader);
 
 var OctreeLoader = /*#__PURE__*/function () {
   /**
    * Create a OctreeLoader.
    * @classdesc Class for loading voxel data stored in a PointOctree.
    * @mixes levelOfDetail
    */
   function OctreeLoader() {
     _classCallCheck(this, OctreeLoader);
 
     autoBind(this);
     Object.assign(this, levelOfDetail);
   }
   /**
    * Parses a PointOctree.
     * @param {number[][][]} matrix The matrix to be transformed.
    * @return {Promise<PointOctree>} Promise with an octree filled with voxel data.
    */
 
 
   _createClass(OctreeLoader, [{
     key: "parse",
     value: function parse(octree) {
       var self = this;
       return new Promise(function (resolve) {
         var newOctree = new PointOctree(octree.root.min, octree.max, 0, self.LOD.maxPoints, self.LOD.maxDepth);
 
         var _iterator = _createForOfIteratorHelper(octree.leaves()),
             _step;
 
         try {
           for (_iterator.s(); !(_step = _iterator.n()).done;) {
             var leaf = _step.value;
 
             if (leaf.points !== null) {
               var i;
 
               for (i = 0; i < leaf.points.length; i++) {
                 var point = leaf.points[i];
                 var data = leaf.data[i];
                 newOctree.insert(point, data);
               }
             }
           }
         } catch (err) {
           _iterator.e(err);
         } finally {
           _iterator.f();
         }
 
         resolve(newOctree);
       });
     }
   }]);
 
   return OctreeLoader;
 }();
 
 var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
 
 function createCommonjsModule(fn, module) {
     return module = { exports: {} }, fn(module, module.exports), module.exports;
 }
 
 var formatVox = createCommonjsModule(function (module, exports) {
   // Generated by Haxe 4.0.0 (git build development @ 42fc22254)
   var $hx_exports =  exports ;
 
   (function ($global) {
 
     $hx_exports["format"] = $hx_exports["format"] || {};
     $hx_exports["format"]["vox"] = $hx_exports["format"]["vox"] || {};
 
     var $estr = function () {
       return js_Boot.__string_rec(this, '');
     };
 
     function $extend(from, fields) {
       function Inherit() {}
 
       Inherit.prototype = from;
       var proto = new Inherit();
 
       for (var name in fields) proto[name] = fields[name];
 
       if (fields.toString !== Object.prototype.toString) proto.toString = fields.toString;
       return proto;
     }
 
     var HxOverrides = function () {};
 
     HxOverrides.__name__ = true;
 
     HxOverrides.cca = function (s, index) {
       var x = s.charCodeAt(index);
 
       if (x != x) {
         return undefined;
       }
 
       return x;
     };
 
     Math.__name__ = true;
 
     var Std = function () {};
 
     Std.__name__ = true;
 
     Std.string = function (s) {
       return js_Boot.__string_rec(s, "");
     };
 
     Std.parseInt = function (x) {
       var v = parseInt(x, 10);
 
       if (v == 0 && (HxOverrides.cca(x, 1) == 120 || HxOverrides.cca(x, 1) == 88)) {
         v = parseInt(x);
       }
 
       if (isNaN(v)) {
         return null;
       }
 
       return v;
     };
 
     var format_vox_VoxNodeTools = $hx_exports["format"]["vox"]["VoxNodeTools"] = function () {};
 
     format_vox_VoxNodeTools.__name__ = true;
 
     format_vox_VoxNodeTools.walkNodeGraph = function (vox, w) {
       w.beginGraph(vox);
       format_vox_VoxNodeTools.nodeWalker(vox.nodeGraph, w);
       w.endGraph();
     };
 
     format_vox_VoxNodeTools.nodeWalker = function (node, w) {
       if (node == null) {
         console.log("VoxNodeTools.hx:30:", "TODO (DK)");
       } else {
         switch (node[1]) {
           case 0:
             w.onTransform(node[5][0]);
             format_vox_VoxNodeTools.nodeWalker(node[6], w);
             break;
 
           case 1:
             var children = node[3];
             w.beginGroup(node[2]);
             var _g = 0;
 
             while (_g < children.length) format_vox_VoxNodeTools.nodeWalker(children[_g++], w);
 
             w.endGroup();
             break;
 
           case 2:
             w.onShape(node[2], node[3]);
             break;
         }
       }
 
       return;
     };
 
     var format_vox_VoxReader = $hx_exports["format"]["vox"]["VoxReader"] = function () {};
 
     format_vox_VoxReader.__name__ = true;
 
     format_vox_VoxReader.read = function (data, then) {
       if (data == null) {
         then(null, "Invalid input");
         return;
       }
 
       var input = new haxe_io_BytesInput(haxe_io_Bytes.ofData(data));
 
       if (input.readString(4) != "VOX ") {
         then(null, "Expected \"VOX \" header");
         return;
       }
 
       var version = input.readInt32();
 
       if (version != 150) {
         then(null, "Unsupported version \"" + version + "\"");
         return;
       }
 
       var vox = new format_vox_types_Vox();
       vox.palette = format_vox_VoxReader.get_DefaultPalette().map(format_vox_VoxTools.transformColor);
       var nodeData = [];
       format_vox_VoxReader.readChunk(input, vox, nodeData, {
         modelIndex: 0,
         sizeIndex: 0
       });
 
       if (nodeData.length > 0) {
         vox.nodeGraph = format_vox_VoxReader.buildNodeGraph(vox, nodeData, 0);
       }
 
       then(vox, null);
     };
 
     format_vox_VoxReader.readChunk = function (input, vox, nodeData, state) {
       var chunkId = input.readString(4);
       var contentSize = input.readInt32();
       var childBytes = input.readInt32();
 
       switch (chunkId) {
         case "MAIN":
           break;
 
         case "MATL":
           var m_id = input.readInt32();
 
           var _g = new haxe_ds_StringMap();
 
           var _g2 = 0;
 
           var _g1 = input.readInt32();
 
           while (_g2 < _g1) {
             ++_g2;
             var key = input.read(input.readInt32()).toString();
             var value = input.read(input.readInt32()).toString();
 
             if (__map_reserved[key] != null) {
               _g.setReserved(key, value);
             } else {
               _g.h[key] = value;
             }
           }
 
           vox.materials[m_id] = _g;
           break;
 
         case "PACK":
           input.readInt32();
           break;
 
         case "RGBA":
           var palette = format_vox_VoxReader.get_DefaultPalette();
           var _g3 = 0;
 
           while (_g3 < 255) palette[_g3++ + 1] = input.readInt32();
 
           input.readInt32();
           vox.palette = palette.map(format_vox_VoxTools.transformColor);
           break;
 
         case "SIZE":
           vox.sizes[state.sizeIndex++] = new format_vox_types_Size(input.readInt32(), input.readInt32(), input.readInt32());
           break;
 
         case "XYZI":
           var vox1 = vox.models;
           var tmp = state.modelIndex++;
           var _g4 = [];
           var _g21 = 0;
 
           var _g11 = input.readInt32();
 
           while (_g21 < _g11) {
             ++_g21;
 
             _g4.push(new format_vox_types_Voxel(input.readByte(), input.readByte(), input.readByte(), input.readByte()));
           }
 
           vox1[tmp] = _g4;
           break;
 
         case "nGRP":
           var nodeId = input.readInt32();
 
           var _g5 = new haxe_ds_StringMap();
 
           var _g22 = 0;
 
           var _g12 = input.readInt32();
 
           while (_g22 < _g12) {
             ++_g22;
             var key1 = input.read(input.readInt32()).toString();
             var value1 = input.read(input.readInt32()).toString();
 
             if (__map_reserved[key1] != null) {
               _g5.setReserved(key1, value1);
             } else {
               _g5.h[key1] = value1;
             }
           }
 
           var numChildren = input.readInt32();
           var _g6 = [];
           var _g23 = 0;
 
           while (_g23 < numChildren) {
             ++_g23;
 
             _g6.push(input.readInt32());
           }
 
           nodeData[nodeId] = format_vox__$VoxReader_NodeData.GroupNodeData(_g5, _g6);
           break;
 
         case "nSHP":
           var nodeId1 = input.readInt32();
 
           var _g7 = new haxe_ds_StringMap();
 
           var _g24 = 0;
 
           var _g13 = input.readInt32();
 
           while (_g24 < _g13) {
             ++_g24;
             var key2 = input.read(input.readInt32()).toString();
             var value2 = input.read(input.readInt32()).toString();
 
             if (__map_reserved[key2] != null) {
               _g7.setReserved(key2, value2);
             } else {
               _g7.h[key2] = value2;
             }
           }
 
           var numModels = input.readInt32();
           var _g8 = [];
           var _g25 = 0;
 
           while (_g25 < numModels) {
             ++_g25;
 
             var _g31 = input.readInt32();
 
             var _g9 = new haxe_ds_StringMap();
 
             var _g26 = 0;
 
             var _g14 = input.readInt32();
 
             while (_g26 < _g14) {
               ++_g26;
               var key3 = input.read(input.readInt32()).toString();
               var value3 = input.read(input.readInt32()).toString();
 
               if (__map_reserved[key3] != null) {
                 _g9.setReserved(key3, value3);
               } else {
                 _g9.h[key3] = value3;
               }
             }
 
             _g8.push(new format_vox_types_Model(_g31, _g9));
           }
 
           nodeData[nodeId1] = format_vox__$VoxReader_NodeData.ShapeNodeData(_g7, _g8);
           break;
 
         case "nTRN":
           var nodeId2 = input.readInt32();
 
           var _g10 = new haxe_ds_StringMap();
 
           var _g27 = 0;
 
           var _g15 = input.readInt32();
 
           while (_g27 < _g15) {
             ++_g27;
             var key4 = input.read(input.readInt32()).toString();
             var value4 = input.read(input.readInt32()).toString();
 
             if (__map_reserved[key4] != null) {
               _g10.setReserved(key4, value4);
             } else {
               _g10.h[key4] = value4;
             }
           }
 
           var childNodeId = input.readInt32();
           var reserved = input.readInt32();
           var layerId = input.readInt32();
           var numFrames = input.readInt32();
           var _g16 = [];
           var _g28 = 0;
 
           while (_g28 < numFrames) {
             ++_g28;
 
             var _g17 = new haxe_ds_StringMap();
 
             var _g29 = 0;
 
             var _g18 = input.readInt32();
 
             while (_g29 < _g18) {
               ++_g29;
               var key5 = input.read(input.readInt32()).toString();
               var value5 = input.read(input.readInt32()).toString();
 
               if (__map_reserved[key5] != null) {
                 _g17.setReserved(key5, value5);
               } else {
                 _g17.h[key5] = value5;
               }
             }
 
             _g16.push(_g17);
           }
 
           nodeData[nodeId2] = format_vox__$VoxReader_NodeData.TransformNodeData(_g10, childNodeId, reserved, layerId, _g16);
           break;
 
         default:
           input.read(contentSize);
       }
 
       var chunkSize = 12 + contentSize + childBytes;
 
       while (childBytes > 0) childBytes -= format_vox_VoxReader.readChunk(input, vox, nodeData, state);
 
       return chunkSize;
     };
 
     format_vox_VoxReader.buildNodeGraph = function (vox, nodeData, nodeId) {
       var n = nodeData[nodeId];
 
       switch (n[1]) {
         case 0:
           return format_vox_types_Node.Transform(n[2], n[4], n[5], n[6], format_vox_VoxReader.buildNodeGraph(vox, nodeData, n[3]));
 
         case 1:
           var children = n[3];
           var att = n[2];
           var _g = [];
           var _g1 = 0;
 
           while (_g1 < children.length) _g.push(format_vox_VoxReader.buildNodeGraph(vox, nodeData, children[_g1++]));
 
           return format_vox_types_Node.Group(att, _g);
 
         case 2:
           return format_vox_types_Node.Shape(n[2], n[3]);
       }
     };
 
     format_vox_VoxReader.readVoxel = function (input) {
       return new format_vox_types_Voxel(input.readByte(), input.readByte(), input.readByte(), input.readByte());
     };
 
     format_vox_VoxReader.readMaterial = function (input) {
       var tmp = input.readInt32();
 
       var _g = new haxe_ds_StringMap();
 
       var _g2 = 0;
 
       var _g1 = input.readInt32();
 
       while (_g2 < _g1) {
         ++_g2;
         var key = input.read(input.readInt32()).toString();
         var value = input.read(input.readInt32()).toString();
 
         if (__map_reserved[key] != null) {
           _g.setReserved(key, value);
         } else {
           _g.h[key] = value;
         }
       }
 
       return {
         id: tmp,
         props: _g
       };
     };
 
     format_vox_VoxReader.readDict = function (input) {
       var _g = new haxe_ds_StringMap();
 
       var _g2 = 0;
 
       var _g1 = input.readInt32();
 
       while (_g2 < _g1) {
         ++_g2;
         var key = input.read(input.readInt32()).toString();
         var value = input.read(input.readInt32()).toString();
 
         if (__map_reserved[key] != null) {
           _g.setReserved(key, value);
         } else {
           _g.h[key] = value;
         }
       }
 
       return _g;
     };
 
     format_vox_VoxReader.i32 = function (input) {
       return input.readInt32();
     };
 
     format_vox_VoxReader.byte = function (input) {
       return input.readByte();
     };
 
     format_vox_VoxReader.string = function (input) {
       return input.read(input.readInt32()).toString();
     };
 
     format_vox_VoxReader.get_DefaultPalette = function () {
       return [0, -1, -3342337, -6684673, -10027009, -13369345, -16711681, -13057, -3355393, -6697729, -10040065, -13382401, -16724737, -26113, -3368449, -6710785, -10053121, -13395457, -16737793, -39169, -3381505, -6723841, -10066177, -13408513, -16750849, -52225, -3394561, -6736897, -10079233, -13421569, -16763905, -65281, -3407617, -6749953, -10092289, -13434625, -16776961, -52, -3342388, -6684724, -10027060, -13369396, -16711732, -13108, -3355444, -6697780, -10040116, -13382452, -16724788, -26164, -3368500, -6710836, -10053172, -13395508, -16737844, -39220, -3381556, -6723892, -10066228, -13408564, -16750900, -52276, -3394612, -6736948, -10079284, -13421620, -16763956, -65332, -3407668, -6750004, -10092340, -13434676, -16777012, -103, -3342439, -6684775, -10027111, -13369447, -16711783, -13159, -3355495, -6697831, -10040167, -13382503, -16724839, -26215, -3368551, -6710887, -10053223, -13395559, -16737895, -39271, -3381607, -6723943, -10066279, -13408615, -16750951, -52327, -3394663, -6736999, -10079335, -13421671, -16764007, -65383, -3407719, -6750055, -10092391, -13434727, -16777063, -154, -3342490, -6684826, -10027162, -13369498, -16711834, -13210, -3355546, -6697882, -10040218, -13382554, -16724890, -26266, -3368602, -6710938, -10053274, -13395610, -16737946, -39322, -3381658, -6723994, -10066330, -13408666, -16751002, -52378, -3394714, -6737050, -10079386, -13421722, -16764058, -65434, -3407770, -6750106, -10092442, -13434778, -16777114, -205, -3342541, -6684877, -10027213, -13369549, -16711885, -13261, -3355597, -6697933, -10040269, -13382605, -16724941, -26317, -3368653, -6710989, -10053325, -13395661, -16737997, -39373, -3381709, -6724045, -10066381, -13408717, -16751053, -52429, -3394765, -6737101, -10079437, -13421773, -16764109, -65485, -3407821, -6750157, -10092493, -13434829, -16777165, -256, -3342592, -6684928, -10027264, -13369600, -16711936, -13312, -3355648, -6697984, -10040320, -13382656, -16724992, -26368, -3368704, -6711040, -10053376, -13395712, -16738048, -39424, -3381760, -6724096, -10066432, -13408768, -16751104, -52480, -3394816, -6737152, -10079488, -13421824, -16764160, -65536, -3407872, -6750208, -10092544, -13434880, -16776978, -16776995, -16777029, -16777046, -16777080, -16777097, -16777131, -16777148, -16777182, -16777199, -16716288, -16720640, -16729344, -16733696, -16742400, -16746752, -16755456, -16759808, -16768512, -16772864, -1179648, -2293760, -4521984, -5636096, -7864320, -8978432, -11206656, -12320768, -14548992, -15663104, -1118482, -2236963, -4473925, -5592406, -7829368, -8947849, -11184811, -12303292, -14540254, -15658735];
     };
 
     var format_vox__$VoxReader_NodeData = {
       __ename__: true,
       __constructs__: ["TransformNodeData", "GroupNodeData", "ShapeNodeData"]
     };
 
     format_vox__$VoxReader_NodeData.TransformNodeData = function (attributes, childNodeId, reserved, layerId, frames) {
       var $x = ["TransformNodeData", 0, attributes, childNodeId, reserved, layerId, frames];
       $x.__enum__ = format_vox__$VoxReader_NodeData;
       $x.toString = $estr;
       return $x;
     };
 
     format_vox__$VoxReader_NodeData.GroupNodeData = function (attributes, children) {
       var $x = ["GroupNodeData", 1, attributes, children];
       $x.__enum__ = format_vox__$VoxReader_NodeData;
       $x.toString = $estr;
       return $x;
     };
 
     format_vox__$VoxReader_NodeData.ShapeNodeData = function (attributes, models) {
       var $x = ["ShapeNodeData", 2, attributes, models];
       $x.__enum__ = format_vox__$VoxReader_NodeData;
       $x.toString = $estr;
       return $x;
     };
 
     var format_vox_VoxTools = $hx_exports["format"]["vox"]["VoxTools"] = function () {};
 
     format_vox_VoxTools.__name__ = true;
 
     format_vox_VoxTools.transformYZ = function (vox) {
       var _g1 = 0;
       var _g = vox.models.length;
 
       while (_g1 < _g) {
         var i = _g1++;
         var dy = vox.sizes[i].y;
         var _g2 = 0;
         var _g3 = vox.models[i];
 
         while (_g2 < _g3.length) {
           var v = _g3[_g2];
           ++_g2;
           var y = v.y;
           v.y = v.z;
           v.z = dy - 1 - y;
         }
       }
     };
 
     format_vox_VoxTools.transformColor = function (color) {
       return new format_vox_types_Color(color & 255, color >> 8 & 255, color >> 16 & 255, color >> 24 & 255);
     };
 
     format_vox_VoxTools.dictHasTranslation = function (d) {
       return ( d.h["_t"]) != null;
     };
 
     format_vox_VoxTools.getTranslationFromDict = function (d) {
       var t =  d.h["_t"];
 
       if (t == null) {
         return {
           x: 0,
           y: 0,
           z: 0
         };
       }
 
       var split = t.split(" ");
       return {
         x: Std.parseInt(split[0]),
         y: Std.parseInt(split[1]),
         z: Std.parseInt(split[2])
       };
     };
 
     format_vox_VoxTools.dictHasRotation = function (d) {
       return ( d.h["_r"]) != null;
     };
 
     format_vox_VoxTools.getRotationFromDict = function (d) {
       var r =  d.h["_r"];
 
       if (r == null) {
         return {
           _00: 1,
           _10: 0,
           _20: 0,
           _01: 0,
           _11: 1,
           _21: 0,
           _02: 0,
           _12: 0,
           _22: 1
         };
       }
 
       var value = Std.parseInt(r);
       var s0 = (value & 16) == 0 ? 1 : -1;
       var s1 = (value & 32) == 0 ? 1 : -1;
       var s2 = (value & 64) == 0 ? 1 : -1;
       var r0 = (value & 1) + (value & 2);
       var r1 = (value >> 2 & 1) + (value >> 2 & 2);
       var r2;
 
       switch (r0) {
         case 0:
           switch (r1) {
             case 1:
               r2 = 2;
               break;
 
             case 2:
               r2 = 1;
               break;
 
             default:
               console.log("VoxTools.hx:90:", "missing r0;r1 match");
               r2 = 0;
           }
 
           break;
 
         case 1:
           switch (r1) {
             case 0:
               r2 = 2;
               break;
 
             case 2:
               r2 = 0;
               break;
 
             default:
               console.log("VoxTools.hx:90:", "missing r0;r1 match");
               r2 = 0;
           }
 
           break;
 
         case 2:
           switch (r1) {
             case 0:
               r2 = 1;
               break;
 
             case 1:
               r2 = 0;
               break;
 
             default:
               console.log("VoxTools.hx:90:", "missing r0;r1 match");
               r2 = 0;
           }
 
           break;
 
         default:
           console.log("VoxTools.hx:90:", "missing r0;r1 match");
           r2 = 0;
       }
 
       return {
         _00: r0 == 0 ? s0 : 0,
         _10: r0 == 1 ? s0 : 0,
         _20: r0 == 2 ? s0 : 0,
         _01: r1 == 0 ? s1 : 0,
         _11: r1 == 1 ? s1 : 0,
         _21: r1 == 2 ? s1 : 0,
         _02: r2 == 0 ? s2 : 0,
         _12: r2 == 1 ? s2 : 0,
         _22: r2 == 2 ? s2 : 0
       };
     };
 
     var format_vox_types_Color = function (r, g, b, a) {
       this.r = r;
       this.g = g;
       this.b = b;
       this.a = a;
     };
 
     format_vox_types_Color.__name__ = true;
 
     var format_vox_types_Model = function (modelId, attributes) {
       this.modelId = modelId;
       this.attributes = attributes;
     };
 
     format_vox_types_Model.__name__ = true;
     var format_vox_types_Node = {
       __ename__: true,
       __constructs__: ["Transform", "Group", "Shape"]
     };
 
     format_vox_types_Node.Transform = function (attributes, reserved, layerId, frames, child) {
       var $x = ["Transform", 0, attributes, reserved, layerId, frames, child];
       $x.__enum__ = format_vox_types_Node;
       $x.toString = $estr;
       return $x;
     };
 
     format_vox_types_Node.Group = function (attributes, children) {
       var $x = ["Group", 1, attributes, children];
       $x.__enum__ = format_vox_types_Node;
       $x.toString = $estr;
       return $x;
     };
 
     format_vox_types_Node.Shape = function (attributes, models) {
       var $x = ["Shape", 2, attributes, models];
       $x.__enum__ = format_vox_types_Node;
       $x.toString = $estr;
       return $x;
     };
 
     var format_vox_types_Size = function (x, y, z) {
       this.x = x;
       this.y = y;
       this.z = z;
     };
 
     format_vox_types_Size.__name__ = true;
 
     var format_vox_types_Vox = function () {
       this.materials = [];
       this.models = [];
       this.sizes = [];
     };
 
     format_vox_types_Vox.__name__ = true;
 
     var format_vox_types_Voxel = function (x, y, z, colorIndex) {
       this.x = x;
       this.y = y;
       this.z = z;
       this.colorIndex = colorIndex;
     };
 
     format_vox_types_Voxel.__name__ = true;
 
     var haxe_IMap = function () {};
 
     haxe_IMap.__name__ = true;
 
     var haxe_ds_StringMap = function () {
       this.h = {};
     };
 
     haxe_ds_StringMap.__name__ = true;
     haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
     haxe_ds_StringMap.prototype = {
       setReserved: function (key, value) {
         if (this.rh == null) {
           this.rh = {};
         }
 
         this.rh["$" + key] = value;
       },
       getReserved: function (key) {
         if (this.rh == null) {
           return null;
         } else {
           return this.rh["$" + key];
         }
       }
     };
 
     var haxe_io_Bytes = function (data) {
       this.length = data.byteLength;
       this.b = new Uint8Array(data);
       this.b.bufferValue = data;
       data.hxBytes = this;
       data.bytes = this.b;
     };
 
     haxe_io_Bytes.__name__ = true;
 
     haxe_io_Bytes.ofData = function (b) {
       var hb = b.hxBytes;
 
       if (hb != null) {
         return hb;
       }
 
       return new haxe_io_Bytes(b);
     };
 
     haxe_io_Bytes.prototype = {
       getString: function (pos, len) {
         if (pos < 0 || len < 0 || pos + len > this.length) {
           throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
         }
 
         var s = "";
         var b = this.b;
         var fcc = String.fromCharCode;
         var i = pos;
         var max = pos + len;
 
         while (i < max) {
           var c = b[i++];
 
           if (c < 128) {
             if (c == 0) {
               break;
             }
 
             s += fcc(c);
           } else if (c < 224) {
             s += fcc((c & 63) << 6 | b[i++] & 127);
           } else if (c < 240) {
             s += fcc((c & 31) << 12 | (b[i++] & 127) << 6 | b[i++] & 127);
           } else {
             var u = (c & 15) << 18 | (b[i++] & 127) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
             s += fcc((u >> 10) + 55232);
             s += fcc(u & 1023 | 56320);
           }
         }
 
         return s;
       },
       toString: function () {
         return this.getString(0, this.length);
       }
     };
 
     var haxe_io_Input = function () {};
 
     haxe_io_Input.__name__ = true;
     haxe_io_Input.prototype = {
       readByte: function () {
         throw new js__$Boot_HaxeError("Not implemented");
       },
       readBytes: function (s, pos, len) {
         var k = len;
         var b = s.b;
 
         if (pos < 0 || len < 0 || pos + len > s.length) {
           throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
         }
 
         try {
           while (k > 0) {
             b[pos] = this.readByte();
             ++pos;
             --k;
           }
         } catch (eof) {
           if (!(eof instanceof js__$Boot_HaxeError ? eof.val : eof instanceof haxe_io_Eof)) {
             throw eof;
           }
         }
 
         return len - k;
       },
       readFullBytes: function (s, pos, len) {
         while (len > 0) {
           var k = this.readBytes(s, pos, len);
 
           if (k == 0) {
             throw new js__$Boot_HaxeError(haxe_io_Error.Blocked);
           }
 
           pos += k;
           len -= k;
         }
       },
       read: function (nbytes) {
         var s = new haxe_io_Bytes(new ArrayBuffer(nbytes));
         var p = 0;
 
         while (nbytes > 0) {
           var k = this.readBytes(s, p, nbytes);
 
           if (k == 0) {
             throw new js__$Boot_HaxeError(haxe_io_Error.Blocked);
           }
 
           p += k;
           nbytes -= k;
         }
 
         return s;
       },
       readInt32: function () {
         var ch1 = this.readByte();
         var ch2 = this.readByte();
         var ch3 = this.readByte();
         var ch4 = this.readByte();
 
         if (this.bigEndian) {
           return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
         } else {
           return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
         }
       },
       readString: function (len) {
         var b = new haxe_io_Bytes(new ArrayBuffer(len));
         this.readFullBytes(b, 0, len);
         return b.toString();
       }
     };
 
     var haxe_io_BytesInput = function (b, pos, len) {
       if (pos == null) {
         pos = 0;
       }
 
       if (len == null) {
         len = b.length - pos;
       }
 
       if (pos < 0 || len < 0 || pos + len > b.length) {
         throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
       }
 
       this.b = b.b;
       this.pos = pos;
       this.len = len;
       this.totlen = len;
     };
 
     haxe_io_BytesInput.__name__ = true;
     haxe_io_BytesInput.__super__ = haxe_io_Input;
     haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype, {
       readByte: function () {
         if (this.len == 0) {
           throw new js__$Boot_HaxeError(new haxe_io_Eof());
         }
 
         this.len--;
         return this.b[this.pos++];
       },
       readBytes: function (buf, pos, len) {
         if (pos < 0 || len < 0 || pos + len > buf.length) {
           throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
         }
 
         if (this.len == 0 && len > 0) {
           throw new js__$Boot_HaxeError(new haxe_io_Eof());
         }
 
         if (this.len < len) {
           len = this.len;
         }
 
         var b1 = this.b;
         var b2 = buf.b;
         var _g1 = 0;
         var _g = len;
 
         while (_g1 < _g) {
           var i = _g1++;
           b2[pos + i] = b1[this.pos + i];
         }
 
         this.pos += len;
         this.len -= len;
         return len;
       }
     });
 
     var haxe_io_Eof = function () {};
 
     haxe_io_Eof.__name__ = true;
     haxe_io_Eof.prototype = {
       toString: function () {
         return "Eof";
       }
     };
     var haxe_io_Error = {
       __ename__: true,
       __constructs__: ["Blocked", "Overflow", "OutsideBounds", "Custom"]
     };
     haxe_io_Error.Blocked = ["Blocked", 0];
     haxe_io_Error.Blocked.toString = $estr;
     haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
     haxe_io_Error.Overflow = ["Overflow", 1];
     haxe_io_Error.Overflow.toString = $estr;
     haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
     haxe_io_Error.OutsideBounds = ["OutsideBounds", 2];
     haxe_io_Error.OutsideBounds.toString = $estr;
     haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
 
     haxe_io_Error.Custom = function (e) {
       var $x = ["Custom", 3, e];
       $x.__enum__ = haxe_io_Error;
       $x.toString = $estr;
       return $x;
     };
 
     var js__$Boot_HaxeError = function (val) {
       Error.call(this);
       this.val = val;
 
       if (Error.captureStackTrace) {
         Error.captureStackTrace(this, js__$Boot_HaxeError);
       }
     };
 
     js__$Boot_HaxeError.__name__ = true;
 
     js__$Boot_HaxeError.wrap = function (val) {
       if (val instanceof Error) {
         return val;
       } else {
         return new js__$Boot_HaxeError(val);
       }
     };
 
     js__$Boot_HaxeError.__super__ = Error;
     js__$Boot_HaxeError.prototype = $extend(Error.prototype, {});
 
     var js_Boot = function () {};
 
     js_Boot.__name__ = true;
 
     js_Boot.__string_rec = function (o, s) {
       if (o == null) {
         return "null";
       }
 
       if (s.length >= 5) {
         return "<...>";
       }
 
       var t = typeof o;
 
       if (t == "function" && (o.__name__ || o.__ename__)) {
         t = "object";
       }
 
       switch (t) {
         case "function":
           return "<function>";
 
         case "object":
           if (o instanceof Array) {
             if (o.__enum__) {
               if (o.length == 2) {
                 return o[0];
               }
 
               var str = o[0] + "(";
               s += "\t";
               var _g1 = 2;
               var _g = o.length;
 
               while (_g1 < _g) {
                 var i = _g1++;
 
                 if (i != 2) {
                   str += "," + js_Boot.__string_rec(o[i], s);
                 } else {
                   str += js_Boot.__string_rec(o[i], s);
                 }
               }
 
               return str + ")";
             }
 
             var l = o.length;
             var str1 = "[";
             s += "\t";
             var _g11 = 0;
             var _g2 = l;
 
             while (_g11 < _g2) {
               var i2 = _g11++;
               str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2], s);
             }
 
             str1 += "]";
             return str1;
           }
 
           var tostr;
 
           try {
             tostr = o.toString;
           } catch (e) {
             var e1 = e instanceof js__$Boot_HaxeError ? e.val : e;
             return "???";
           }
 
           if (tostr != null && tostr != Object.toString && typeof tostr == "function") {
             var s2 = o.toString();
 
             if (s2 != "[object Object]") {
               return s2;
             }
           }
 
           var k = null;
           var str2 = "{\n";
           s += "\t";
           var hasp = o.hasOwnProperty != null;
 
           for (var k in o) {
             if (hasp && !o.hasOwnProperty(k)) {
               continue;
             }
 
             if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
               continue;
             }
 
             if (str2.length != 2) {
               str2 += ", \n";
             }
 
             str2 += s + k + " : " + js_Boot.__string_rec(o[k], s);
           }
 
           s = s.substring(1);
           str2 += "\n" + s + "}";
           return str2;
 
         case "string":
           return o;
 
         default:
           return String(o);
       }
     };
 
     var js_html_compat_ArrayBuffer = function (a) {
       if (a instanceof Array && a.__enum__ == null) {
         this.a = a;
         this.byteLength = a.length;
       } else {
         var len = a;
         this.a = [];
         var _g1 = 0;
 
         while (_g1 < len) this.a[_g1++] = 0;
 
         this.byteLength = len;
       }
     };
 
     js_html_compat_ArrayBuffer.__name__ = true;
 
     js_html_compat_ArrayBuffer.sliceImpl = function (begin, end) {
       var u = new Uint8Array(this, begin, end == null ? null : end - begin);
       var result = new ArrayBuffer(u.byteLength);
       new Uint8Array(result).set(u);
       return result;
     };
 
     js_html_compat_ArrayBuffer.prototype = {
       slice: function (begin, end) {
         return new js_html_compat_ArrayBuffer(this.a.slice(begin, end));
       }
     };
 
     var js_html_compat_Uint8Array = function () {};
 
     js_html_compat_Uint8Array.__name__ = true;
 
     js_html_compat_Uint8Array._new = function (arg1, offset, length) {
       var arr;
 
       if (typeof arg1 == "number") {
         arr = [];
         var _g1 = 0;
         var _g = arg1;
 
         while (_g1 < _g) {
           var i = _g1++;
           arr[i] = 0;
         }
 
         arr.byteLength = arr.length;
         arr.byteOffset = 0;
         arr.buffer = new js_html_compat_ArrayBuffer(arr);
       } else if (arg1 instanceof js_html_compat_ArrayBuffer) {
         var buffer = arg1;
 
         if (offset == null) {
           offset = 0;
         }
 
         if (length == null) {
           length = buffer.byteLength - offset;
         }
 
         if (offset == 0) {
           arr = buffer.a;
         } else {
           arr = buffer.a.slice(offset, offset + length);
         }
 
         arr.byteLength = arr.length;
         arr.byteOffset = offset;
         arr.buffer = buffer;
       } else if (arg1 instanceof Array && arg1.__enum__ == null) {
         arr = arg1.slice();
         arr.byteLength = arr.length;
         arr.byteOffset = 0;
         arr.buffer = new js_html_compat_ArrayBuffer(arr);
       } else {
         throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
       }
 
       arr.subarray = js_html_compat_Uint8Array._subarray;
       arr.set = js_html_compat_Uint8Array._set;
       return arr;
     };
 
     js_html_compat_Uint8Array._set = function (arg, offset) {
       if (arg.buffer instanceof js_html_compat_ArrayBuffer) {
         var a = arg;
 
         if (arg.byteLength + offset > this.byteLength) {
           throw new js__$Boot_HaxeError("set() outside of range");
         }
 
         var _g1 = 0;
         var _g = arg.byteLength;
 
         while (_g1 < _g) {
           var i = _g1++;
           this[i + offset] = a[i];
         }
       } else if (arg instanceof Array && arg.__enum__ == null) {
         var a1 = arg;
 
         if (a1.length + offset > this.byteLength) {
           throw new js__$Boot_HaxeError("set() outside of range");
         }
 
         var _g11 = 0;
         var _g2 = a1.length;
 
         while (_g11 < _g2) {
           var i1 = _g11++;
           this[i1 + offset] = a1[i1];
         }
       } else {
         throw new js__$Boot_HaxeError("TODO");
       }
     };
 
     js_html_compat_Uint8Array._subarray = function (start, end) {
       var a = js_html_compat_Uint8Array._new(this.slice(start, end));
 
       a.byteOffset = start;
       return a;
     };
 
     String.__name__ = true;
     Array.__name__ = true;
     var __map_reserved = {};
     Object.defineProperty(js__$Boot_HaxeError.prototype, "message", {
       get: function () {
         return String(this.val);
       }
     });
     var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
 
     if (ArrayBuffer.prototype.slice == null) {
       ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
     }
 
     var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
     format_vox_VoxTools.TranslationKey = "_t";
     format_vox_VoxTools.RotationKey = "_r";
     js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
   })(typeof window != "undefined" ? window : typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof self != "undefined" ? self : commonjsGlobal);
 
   var format = $hx_exports["format"];
 });
 
 var dist = formatVox.format.vox;
 
 var VOXLoader = /*#__PURE__*/function (_Loader) {
   _inherits(VOXLoader, _Loader);
 
   var _super = _createSuper(VOXLoader);
 
   /**
    * Create a VOXLoader.
    * @classdesc Class for loading voxel data stored in VOX files.
    * @extends Loader
    * @mixes levelOfDetail
    * @param {LoadingManager} manager
    */
   function VOXLoader(manager) {
     var _this;
 
     _classCallCheck(this, VOXLoader);
 
     _this = _super.call(this, manager);
     autoBind(_assertThisInitialized(_this));
     Object.assign(_assertThisInitialized(_this), levelOfDetail);
     return _this;
   }
   /**
    * Loads and parses a VOX file from a URL.
    *
    * @param {String} url - URL to the VOX file.
    * @param {Function} [onLoad] - Callback invoked with the loaded object.
    * @param {Function} [onProgress] - Callback for download progress.
    * @param {Function} [onError] - Callback for download errors.
    */
 
 
   _createClass(VOXLoader, [{
     key: "load",
     value: function load(url, onLoad, onProgress, onError) {
       var scope = this;
       var loader = new FileLoader(this.manager);
       loader.setPath(this.path);
       loader.setResponseType('arraybuffer');
       loader.load(url, function (buffer) {
         scope.parse(buffer).then(function (octree) {
           return onLoad(octree);
         })["catch"](function (err) {
           return console.error(err);
         });
       }, onProgress, onError);
     }
     /**
      * Parse VOX file data.
      * @param {Buffer} buffer Content of VOX file.
      * @return {Promise<PointOctree>} Promise with an octree filled with voxel data.
      */
 
   }, {
     key: "parse",
     value: function parse(buffer) {
       var _this2 = this;
 
       var VoxReader = dist.VoxReader,
           VoxNodeTools = dist.VoxNodeTools,
           VoxTools = dist.VoxTools;
       return new Promise(function (resolve, reject) {
         VoxReader.read(buffer, function (data, err) {
           if (err) {
             reject(err);
           }
 
           var transforms = [];
           var vector = new Vector3$1();
           var rotation = new Matrix4();
           var positions = [];
 
           if (data.world == null) {
             var size = data.sizes[0];
             var modelSize = new Vector3$1(size.x, size.z, size.y);
             positions.push({
               model: 0,
               position: new Vector3$1(),
               rotation: new Vector4(),
               size: modelSize
             });
           } else {
             VoxNodeTools.walkNodeGraph(data, {
               beginGraph: function beginGraph() {},
               endGraph: function endGraph() {},
               onTransform: function onTransform(attributes) {
                 if (VoxTools.dictHasTranslation(attributes)) {
                   var t = VoxTools.getTranslationFromDict(attributes);
                   transforms.push(new Vector3$1(t.x, t.z, t.y));
                   vector.add(new Vector3$1(t.x, t.z, t.y));
                 } else {
                   transforms.push(new Vector3$1());
                 }
 
                 if (VoxTools.dictHasRotation(attributes)) {
                   var r = VoxTools.getRotationFromDict(attributes);
                   var m = new Matrix4();
                   m.set(r._00, r._01, r._02, 0, r._10, r._11, r._12, 0, r._20, r._21, r._22, 0, 0, 0, 0, 1);
                   transforms.push(m);
                   rotation.multiply(m);
                 } else {
                   transforms.push(new Matrix4());
                 }
               },
               beginGroup: function beginGroup() {},
               endGroup: function endGroup() {
                 var m = transforms.pop();
                 var vec = transforms.pop();
                 vector.sub(vec);
                 rotation.multiply(m.getInverse(m));
               },
               onShape: function onShape(attributes, models) {
                 var modelId = models[0].modelId;
                 var position = new Vector3$1().add(vector);
                 var rotVec = new Matrix4().multiply(rotation);
                 var size = data.sizes[modelId];
                 var modelSize = new Vector3$1(size.x, size.z, size.y);
                 positions.push({
                   model: modelId,
                   position: position,
                   rotation: rotVec,
                   size: modelSize
                 });
                 var m = transforms.pop();
                 var vec = transforms.pop();
                 vector.sub(vec);
                 rotation.multiply(m.getInverse(m));
               }
             });
           }
 
           var xMin = Infinity;
           var yMin = Infinity;
           var zMin = Infinity;
           var xMax = -Infinity;
           var yMax = -Infinity;
           var zMax = -Infinity;
 
           for (var i = 0; i < positions.length; i++) {
             var element = positions[i];
             var position = element.position;
             var _size = element.size;
             if (position.x < xMin) xMin = position.x - _size.x / 2;
             if (position.y < yMin) yMin = position.y - _size.y / 2;
             if (position.z < zMin) zMin = position.z - _size.z / 2;
             if (position.x > xMax) xMax = position.x + _size.x / 2;
             if (position.y > yMax) yMax = position.y + _size.y / 2;
             if (position.z > zMax) zMax = position.z + _size.z / 2;
           }
 
           var min = new Vector3$1(xMin, yMin, zMin);
           var max = new Vector3$1(xMax, yMax, zMax);
           var octree = new PointOctree(min, max, 0, _this2.LOD.maxPoints, _this2.LOD.maxDepth);
 
           for (var _i = 0; _i < positions.length; _i++) {
             var model = positions[_i].model;
             var pos = positions[_i].position;
             var _size2 = positions[_i].size;
             var worldCorrection = new Vector3$1().copy(_size2).divideScalar(2);
 
             for (var j = 0; j < data.models[model].length; j++) {
               var _element = data.models[model][j];
               var color = data.palette[_element.colorIndex];
               var voxelData = {
                 color: {
                   r: color.r,
                   g: color.g,
                   b: color.b
                 }
               };
 
               var _position = new Vector3$1(_element.x, _element.z, _element.y);
 
               _position.sub(worldCorrection); // TODO fix rotation matrix basis
               //position.applyMatrix4(rot
 
 
               _position.add(pos);
 
               octree.insert(_position, voxelData);
             }
           }
 
           resolve(octree);
         });
       });
     }
   }]);
 
   return VOXLoader;
 }(Loader);
 
 var XMLLoader = /*#__PURE__*/function (_Loader) {
   _inherits(XMLLoader, _Loader);
 
   var _super = _createSuper(XMLLoader);
 
   /**
    * Create a XMLLoader.
    * @classdesc Class for loading voxel data stored in XML files.
    * @extends Loader
    * @mixes levelOfDetail
    * @param {LoadingManager} manager
    */
   function XMLLoader(manager) {
     var _this;
 
     _classCallCheck(this, XMLLoader);
 
     _this = _super.call(this, manager);
     autoBind(_assertThisInitialized(_this));
     Object.assign(_assertThisInitialized(_this), levelOfDetail);
     return _this;
   }
   /**
    * Loads and parses a XML file from a URL.
    *
    * @param {String} url - URL to the XML file.
    * @param {Function} [onLoad] - Callback invoked with the loaded object.
    * @param {Function} [onProgress] - Callback for download progress.
    * @param {Function} [onError] - Callback for download errors.
    */
 
 
   _createClass(XMLLoader, [{
     key: "load",
     value: function load(url, onLoad, onProgress, onError) {
       var scope = this;
       var loader = new FileLoader(this.manager);
       loader.setPath(this.path); //loader.setResponseType('arraybuffer')
 
       loader.load(url, function (buffer) {
         scope.parse(buffer).then(function (octree) {
           return onLoad(octree);
         })["catch"](function (err) {
           return console.error(err);
         });
       }, onProgress, onError);
     }
     /**
      * Parse XML file data.
      * @param {Buffer} buffer Content of XML file.
      * @return {Promise<PointOctree>} Promise with an octree filled with voxel data.
      */
 
   }, {
     key: "parse",
     value: function parse(buffer) {
       var _this2 = this;
 
       return new Promise(function (resolve, reject) {
         var parser = new DOMParser();
         var xmlDoc = parser.parseFromString(buffer, "application/xml");
         var dimensionsNode = xmlDoc.documentElement.getElementsByTagName("dimensions")[0];
         var widthNode = dimensionsNode.getElementsByTagName("width")[0];
         var width = widthNode.childNodes[0].nodeValue;
         var heightNode = dimensionsNode.getElementsByTagName("height")[0];
         var height = heightNode.childNodes[0].nodeValue;
         var depthNode = dimensionsNode.getElementsByTagName("depth")[0];
         var depth = depthNode.childNodes[0].nodeValue;
         var voxelsNode = xmlDoc.documentElement.getElementsByTagName("voxels")[0];
         var voxelNodes = voxelsNode.getElementsByTagName("voxel");
         var min = new Vector3$1(-width / 2, -height / 2, -depth / 2);
         var max = new Vector3$1(width / 2, height / 2, depth / 2);
         var octree = new PointOctree(min, max, 0, _this2.LOD.maxPoints, _this2.LOD.maxDepth);
         var voxelData = {};
         Array.from(voxelNodes).forEach(function (voxelNode) {
           var positionNode = voxelNode.getElementsByTagName("position")[0];
           var x, y, z;
           var xNode = positionNode.getElementsByTagName("x")[0];
           x = xNode.childNodes[0].nodeValue * 1;
           var yNode = positionNode.getElementsByTagName("y")[0];
           y = yNode.childNodes[0].nodeValue * 1;
           var zNode = positionNode.getElementsByTagName("z")[0];
           z = zNode.childNodes[0].nodeValue * 1;
           x = x - width / 2;
           y = y - height / 2;
           z = z - depth / 2;
           var colorNode = voxelNode.getElementsByTagName("color")[0];
 
           if (colorNode) {
             var r, g, b;
             var rNode = colorNode.getElementsByTagName("r")[0];
             r = rNode.childNodes[0].nodeValue * 1;
             var gNode = colorNode.getElementsByTagName("g")[0];
             g = gNode.childNodes[0].nodeValue * 1;
             var bNode = colorNode.getElementsByTagName("b")[0];
             b = bNode.childNodes[0].nodeValue * 1;
             voxelData = {
               color: {
                 r: r,
                 g: g,
                 b: b
               }
             };
           }
 
           octree.insert(new Vector3$1(x, y, z), voxelData);
         });
         resolve(octree);
       });
     }
   }]);
 
   return XMLLoader;
 }(Loader);
 
 /**
  * binvox v1.1.0 build Sun Apr 26 2020
  * https://github.com/andstor/binvox
  * Copyright 2020 André Storhaug, MIT
  */
 function _classCallCheck$1(instance, Constructor) {
   if (!(instance instanceof Constructor)) {
     throw new TypeError("Cannot call a class as a function");
   }
 }
 
 function _defineProperties$1(target, props) {
   for (var i = 0; i < props.length; i++) {
     var descriptor = props[i];
     descriptor.enumerable = descriptor.enumerable || false;
     descriptor.configurable = true;
     if ("value" in descriptor) descriptor.writable = true;
     Object.defineProperty(target, descriptor.key, descriptor);
   }
 }
 
 function _createClass$1(Constructor, protoProps, staticProps) {
   if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
   if (staticProps) _defineProperties$1(Constructor, staticProps);
   return Constructor;
 }
 /**
  * @typedef {Object} Voxel The actual voxel data, describing a filled voxel.
  * @property {number} x The x coordinate of the voxel.
  * @property {number} y The y coordinate of the voxel.
  * @property {number} z The z coordinate of the voxel.
  */
 
 /**
  * @typedef {Object} VoxelData Parsed BINVOX file data structure representation.
  * @property {Object} dimension The dimension of the voxel data.
  * @property {number} dimension.depth The depth dimension of the voxel data.
  * @property {number} dimension.width The width dimension of the voxel data.
  * @property {number} dimension.height The height dimension of the voxel data.
  * @property {Object} translate The translation of the voxel data.
  * @property {number} translate.depth The depth translation of the voxel data.
  * @property {number} translate.width The width translation of the voxel data.
  * @property {number} translate.height The height translation of the voxel data.
  * @property {number} scale The scaling of the voxel data.
  * @property {Array<Voxel>} voxels The actual voxel data, describing filled voxels.
  */
 
 /**
  * Parser for parsing BINVOX voxel file data.
  */
 
 
 var Parser = /*#__PURE__*/function () {
   /**
    * Creates a BINVOX Parser.
    */
   function Parser() {
     _classCallCheck$1(this, Parser);
 
     this.dimension = {};
     this.translation = {};
     this.scale = 1;
     this.voxels = [];
     this.index = 0;
   }
   /**
    * Parse BINVOX file buffer data.
    * @param {ArrayBuffer} buffer BINVOX buffer data.
    * @returns {VoxelData} The parsed voxel data.
    */
 
 
   _createClass$1(Parser, [{
     key: "parse",
     value: function parse(buffer) {
       this._parseHeader(buffer);
 
       this._parseVoxelData(buffer);
 
       return {
         dimension: this.dimension,
         translate: this.translation,
         scale: this.scale,
         voxels: this.voxels
       };
     }
     /**
      * Parse the BINVOX ASCII file header.
      * @param {ArrayBuffer} buffer BINVOX file buffer data.
      * @private
      */
 
   }, {
     key: "_parseHeader",
     value: function _parseHeader(buffer) {
       var decoder = new TextDecoder('ascii');
       var continueReading = true;
       var lines = [];
       var i = this.index;
       var line = "";
 
       while (continueReading) {
         var _char = decoder.decode(buffer.slice(i, i + 1));
 
         if (_char === "\n") {
           lines.push(line);
           line = "";
         } else {
           line += _char;
         }
 
         if (line === "Data" || lines.length >= 5) {
           continueReading = false;
         }
 
         i++;
       }
 
       this.index = i;
       var version = lines[0];
       var dimension = lines[1];
       var translate = lines[2];
       var scale = lines[3];
       var data = lines[4]; // Check "version" line
 
       if (version !== "#binvox 1") {
         throw new Error("First line reads \"" + version + "\" instead of \"#binvox\"");
       } // Parse "dimension"
 
 
       var dimensionArray = dimension.split(" ");
 
       if (dimensionArray[0] !== "dim") {
         throw new Error("Error reading dimension line");
       }
 
       this.dimension = {
         depth: parseInt(dimensionArray[1]),
         width: parseInt(dimensionArray[2]),
         height: parseInt(dimensionArray[3])
       }; // Parse "translation"
 
       var translateArray = translate.split(" ");
 
       if (translateArray[0] !== "translate") {
         throw new Error("Error reading translate line");
       }
 
       this.translation = {
         depth: parseFloat(translateArray[1]),
         width: parseFloat(translateArray[2]),
         height: parseFloat(translateArray[3])
       }; // Parse "scale"
 
       var scaleArray = scale.split(" ");
 
       if (scaleArray[0] !== "scale") {
         throw new Error("Error reading scale line");
       }
 
       this.scale = parseFloat(scaleArray[1]); // Check "data" line
 
       if (data !== "data") {
         throw new Error("Error reading header");
       }
     }
     /**
      * Parse the voxel buffer data.
      * @param {ArrayBuffer} buffer BINVOX file voxel buffer data.
      * @private
      */
 
   }, {
     key: "_parseVoxelData",
     value: function _parseVoxelData(buffer) {
       var int8view = new Uint8Array(buffer, this.index);
       var i = 0;
       var y = 0;
       var z = 0;
       var x = 0;
 
       while (i < int8view.length) {
         var value = int8view[i];
         var count = int8view[i + 1];
 
         for (var j = 0; j < count; j++) {
           if (value === 1) {
             var point = {
               x: x,
               y: y,
               z: z
             };
             this.voxels.push(point);
           }
 
           y++;
 
           if (y === this.dimension.width) {
             y = 0;
             z++;
           }
 
           if (z === this.dimension.height) {
             z = 0;
             x++;
           }
         }
 
         i += 2;
       }
     }
   }]);
 
   return Parser;
 }();
 
 var BINVOXLoader = /*#__PURE__*/function (_Loader) {
   _inherits(BINVOXLoader, _Loader);
 
   var _super = _createSuper(BINVOXLoader);
 
   /**
    * Create a BINVOXLoader.
    * @classdesc Class for loading voxel data stored in BINVOX files.
    * @extends Loader
    * @mixes levelOfDetail
    * @param {LoadingManager} manager
    */
   function BINVOXLoader(manager) {
     var _this;
 
     _classCallCheck(this, BINVOXLoader);
 
     _this = _super.call(this, manager);
     autoBind(_assertThisInitialized(_this));
     Object.assign(_assertThisInitialized(_this), levelOfDetail);
     return _this;
   }
   /**
    * Loads and parses a BINVOX file from a URL.
    *
    * @param {String} url - URL to the BINVOX file.
    * @param {Function} [onLoad] - Callback invoked with the loaded object.
    * @param {Function} [onProgress] - Callback for download progress.
    * @param {Function} [onError] - Callback for download errors.
    */
 
 
   _createClass(BINVOXLoader, [{
     key: "load",
     value: function load(url, onLoad, onProgress, onError) {
       var scope = this;
       var loader = new FileLoader(this.manager);
       loader.setPath(this.path);
       loader.setResponseType('arraybuffer');
       loader.load(url, function (buffer) {
         scope.parse(buffer).then(function (octree) {
           return onLoad(octree);
         })["catch"](function (err) {
           return console.error(err);
         });
       }, onProgress, onError);
     }
     /**
      * Parse BINVOX file data.
      * @param {Buffer} buffer Content of BINVOX file.
      * @return {Promise<PointOctree>} Promise with an octree filled with voxel data.
      */
 
   }, {
     key: "parse",
     value: function parse(buffer) {
       var _this2 = this;
 
       return new Promise(function (resolve, reject) {
         var parser = new Parser();
         var data = parser.parse(buffer);
         var depth = data.dimension.depth;
         var width = data.dimension.width;
         var height = data.dimension.height;
         var min = new Vector3$1(-depth / 2, -height / 2, -width / 2);
         var max = new Vector3$1(depth / 2, height / 2, width / 2);
         var octree = new PointOctree(min, max, 0, _this2.LOD.maxPoints, _this2.LOD.maxDepth);
         var voxelData = {};
         data.voxels.forEach(function (voxel) {
           var x, y, z;
           x = voxel.x - depth / 2;
           y = voxel.y - width / 2;
           z = voxel.z - height / 2;
           var point = new Vector3$1(x, z, y);
           octree.insert(point, voxelData);
         });
         resolve(octree);
       });
     }
   }]);
 
   return BINVOXLoader;
 }(Loader);
 
 /**
  * Factory class for creating various loaders.
  */
 
 var LoaderFactory = /*#__PURE__*/function () {
   /**
    * Create a LoaderFactory.
    * @param {LoadingManager} manager
    */
   function LoaderFactory(manager) {
     _classCallCheck(this, LoaderFactory);
 
     this.manager = manager;
   }
   /**
    * Get a loader based on type.
    * @param {string} type The type of loader to get.
    */
 
 
   _createClass(LoaderFactory, [{
     key: "getLoader",
     value: function getLoader(type) {
       switch (type) {
         case 'vox':
           return new VOXLoader(this.manager);
 
         case 'xml':
           return new XMLLoader(this.manager);
 
         case 'binvox':
           return new BINVOXLoader(this.manager);
 
         case 'array':
           return new ArrayLoader(this.manager);
 
         case 'octree':
           return new OctreeLoader();
 
         default:
           throw new Error('Unsupported type (' + type + ').');
       }
     }
   }]);
 
   return LoaderFactory;
 }();
 
 var VoxelLoader = /*#__PURE__*/function () {
   /**
    * Create a VoxelLoader.
    * @classdesc Class for loading voxel data stored in various formats.
    * @param {LoadingManager} manager
    * @mixes levelOfDetail
    */
   function VoxelLoader(manager) {
     _classCallCheck(this, VoxelLoader);
 
     autoBind(this);
     Object.assign(this, levelOfDetail);
     this.manager = manager;
     this.octree = null;
     this.material = null;
     this.voxelSize = null;
     this.setVoxelMaterial();
     this.setVoxelSize();
   }
   /**
    * Set the material used for all voxels.
    * Note that the {@link Material.vertexColors} will be set to {@link VertexColors}.
    * @param {Material} Material The wanted material.
    */
 
 
   _createClass(VoxelLoader, [{
     key: "setVoxelMaterial",
     value: function setVoxelMaterial(material) {
       var defaultMaterial = new MeshPhongMaterial({
         color: 0xffffff
       });
       material = typeof material !== 'undefined' ? material : defaultMaterial;
       material.vertexColors = VertexColors;
       this.material = material;
     }
     /**
      * Set the size of the cubes representing voxels generated in {@link VoxelLoader#generateMesh}.
      * @param {float} [voxelSize=1]
      */
 
   }, {
     key: "setVoxelSize",
     value: function setVoxelSize() {
       var voxelSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
       this.voxelSize = voxelSize;
     }
     /**
      * Update the internal data structures and settings.
     * @return {Promise<PointOctree>} Promise with an updated octree.
      */
 
   }, {
     key: "update",
     value: function update() {
       if (this.octree === null) {
         throw new Error('Octree is not built');
       }
 
       return this.parseData(this.octree, 'octree');
     }
     /**
     * Loads and parses a 3D model file from a URL.
     *
     * @param {String} url - URL to the VOX file.
     * @param {Function} [onLoad] - Callback invoked with the Mesh object.
     * @param {Function} [onProgress] - Callback for download progress.
     * @param {Function} [onError] - Callback for download errors.
     */
 
   }, {
     key: "loadFile",
     value: function loadFile(url, onLoad, onProgress, onError) {
       var scope = this;
       var extension = url.split('.').pop().toLowerCase();
       var loaderFactory = new LoaderFactory(this.manager);
       var loader = loaderFactory.getLoader(extension);
       loader.setLOD(this.LOD.maxPoints, this.LOD.maxDepth);
       loader.load(url, function (octree) {
         scope.octree = octree;
         onLoad(scope.generateMesh(octree));
       }, onProgress, onError);
     }
     /**
      * Parses voxel data.
      * @param {PointOctree} octree Octree with voxel data stored as points in space.
     * @return {Promise<PointOctree>} Promise with an octree filled with voxel data.
      */
 
   }, {
     key: "parseData",
     value: function parseData(data, type) {
       var scope = this;
       var loaderFactory = new LoaderFactory(this.manager);
       var loader = loaderFactory.getLoader(type);
       loader.setLOD(this.LOD.maxPoints, this.LOD.maxDepth);
       return new Promise(function (resolve) {
         loader.parse(data).then(function (octree) {
           scope.octree = octree;
           resolve(octree);
         });
       });
     }
     /**
      * Generates a polygon mesh with cubes based on voxel data.
      * One cube for each voxel.
      * @param {PointOctree} octree Octree with voxel data stored as points in space.
      * @returns {Mesh} 3D mesh based on voxel data
      */
 
   }, {
     key: "generateMesh",
     value: function generateMesh(octree) {
       var mergedGeometry = new Geometry();
       var material = this.material;
 
       var _iterator = _createForOfIteratorHelper(octree.leaves()),
           _step;
 
       try {
         for (_iterator.s(); !(_step = _iterator.n()).done;) {
           var leaf = _step.value;
 
           if (leaf.points !== null) {
             var pos = new Vector3$1();
             var i;
             var min = {
               x: leaf.points[0].x,
               y: leaf.points[0].y,
               z: leaf.points[0].z
             };
             var max = {
               x: leaf.points[0].x,
               y: leaf.points[0].y,
               z: leaf.points[0].z
             };
 
             for (i = 0; i < leaf.points.length; i++) {
               var point = leaf.points[i];
               pos.add(point);
               min.x = Math.min(min.x, point.x);
               min.y = Math.min(min.y, point.y);
               min.z = Math.min(min.z, point.z);
               max.x = Math.max(max.x, point.x);
               max.y = Math.max(max.y, point.y);
               max.z = Math.max(max.z, point.z);
             }
 
             var width = Math.round((this.voxelSize + (max.x - min.x)) * 100) / 100;
             ;
             var height = Math.round((this.voxelSize + (max.y - min.y)) * 100) / 100;
             ;
             var depth = Math.round((this.voxelSize + (max.z - min.z)) * 100) / 100;
             var voxelGeometry = new BoxGeometry(width, height, depth);
             pos.divideScalar(i);
             var rgb = leaf.data[0].color;
 
             if (rgb != null) {
               var color = new Color().setRGB(rgb.r / 255, rgb.g / 255, rgb.b / 255);
 
               for (var i = 0; i < voxelGeometry.faces.length; i++) {
                 var face = voxelGeometry.faces[i];
                 face.color.set(color);
               }
             }
 
             voxelGeometry.translate(pos.x, pos.y, pos.z);
             mergedGeometry.merge(voxelGeometry);
             voxelGeometry.translate(-pos.x, -pos.y, -pos.z);
           }
         }
       } catch (err) {
         _iterator.e(err);
       } finally {
         _iterator.f();
       }
 
       var bufGeometry = new BufferGeometry().fromGeometry(mergedGeometry);
       bufGeometry.computeFaceNormals();
       bufGeometry.computeVertexNormals();
       var voxels = new Mesh(bufGeometry, material);
       return voxels;
     }
   }]);
 
   return VoxelLoader;
 }();
 
 export default VoxelLoader;
 