
/**
 * Flytta isär cirklar som överlappar varandra
 *
 * @param {*} a
 * @param {*} b
 * @param {*} distance
 */
function handleCirclesOverlap(a, b, distance) {

    var overlap = a.radius + b.radius - distance;

    // 4 alternativ där cirklar möts och där den minsta cirkeln flyttas
    if (a.x >= b.x && a.y >= b.y) {

        if (a.radius < b.radius) {
            a.x += overlap;
            a.y += overlap;
        } else {
            b.x -= overlap;
            b.y -= overlap;
        }
    } else if (a.x >= b.x && a.y <= b.y) {
        if (a.radius < b.radius) {
            a.x += overlap;
            a.y -= overlap;
        } else {
            b.x -= overlap;
            b.y += overlap;
        }
    } else if (a.x <= b.x && a.y <= b.y) {
        if (a.radius < b.radius) {
            a.x -= overlap;
            a.y -= overlap;
        } else {
            b.x += overlap;
            b.y += overlap;
        }
    } else if (a.x <= b.x && a.y >= b.y) {
        if (a.radius < b.radius) {
            a.x -= overlap;
            a.y += overlap;
        } else {
            b.x += overlap;
            b.y -= overlap;
        }
    }
}

/**
 * Hantera cirklar som en elastisk kollision
 *
 * @param {*} a
 * @param {*} b
 */
function handleCirclesCollision(a, b) {
    
    // vinklar
    var theta1 = Math.atan2(a.vy, a.vx);
    var theta2 = Math.atan2(b.vy, b.vx);
    var phi = Math.atan2(b.y - a.y, b.x - a.x);
    
    // elastisk kollision där cirklars radie motsvarar cirklars massa
    var m1 = a.radius;
    var m2 = b.radius;

    // hastigheter
    var v1 = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
    var v2 = Math.sqrt(b.vx * b.vx + b.vy * b.vy);

    // beräkna resultatet av kollisionen
    // https://en.wikipedia.org/wiki/Elastic_collision
    a.vx = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math
        .cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
    a.vy = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math
        .sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
    b.vx = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math
        .cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
    b.vy = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math
        .sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);
}
