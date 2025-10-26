function applySpringForce(q1, q2, dt) {
    let r_ij_vec = {x: q2.x - q1.x, y: q2.y - q1.y};
    let r_ij_mag = Math.sqrt(r_ij_vec.x * r_ij_vec.x + r_ij_vec.y * r_ij_vec.y);
    let r_ij_hat = {x: r_ij_vec.x / r_ij_mag, y: r_ij_vec.y / r_ij_mag};

    const k = 2; // spring constant
    const F_ij_mag = k * (r_ij_mag - 200); // rest length of 200 pixels
    const F_ij = {x: F_ij_mag * r_ij_hat.x, y: F_ij_mag * r_ij_hat.y};

    // // apply damping
    // const damping = 0.9;
    // F_ij.x -= damping * (q0.velocity.x - q1.velocity.x);
    // F_ij.y -= damping * (q0.velocity.y - q1.velocity.y);

    // update velocity and position with time step
    q1.velocity.x += F_ij.x * dt;
    q1.velocity.y += F_ij.y * dt;
    q2.velocity.x -= F_ij.x * dt;
    q2.velocity.y -= F_ij.y * dt;
}

function updatePhysics() {
    let t1 = performance.now();
    let dt = (t1 - t0) / 1000; // convert ms to s
    t0 = t1;

    // spring force for each pair of states

    if (Q.length < 2) return;
    for (let i = 0; i < Q.length - 1; i++) {
        for (let j = i + 1; j < Q.length; j++) {
            // if states have transition between them, apply force
            if (delta[Q[i].name] && delta[Q[i].name].some(([symbol, toStateName]) => toStateName === Q[j].name) ||
                delta[Q[j].name] && delta[Q[j].name].some(([symbol, toStateName]) => toStateName === Q[i].name)) {
                applySpringForce(Q[i], Q[j], dt);
            } else {
                // apply repulsive force
                const dx = Q[j].x - Q[i].x;
                const dy = Q[j].y - Q[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const force = (200 - dist) * 0.01;
                    Q[i].velocity.x -= force * (dx / dist);
                    Q[i].velocity.y -= force * (dy / dist);
                    Q[j].velocity.x += force * (dx / dist);
                    Q[j].velocity.y += force * (dy / dist);
                }
            }
        }
    }

    // add extra force if close to wall
    const wallThreshold = 100;
    for (const state of Q) {
        if (state.x < wallThreshold) {
            state.velocity.x *= state.x / wallThreshold
        } else if (state.x > canvas.width - wallThreshold) {
            state.velocity.x *= (canvas.width - state.x) / wallThreshold
        } else if (state.y < wallThreshold) {
            state.velocity.y *= state.y / wallThreshold
        } else if (state.y > canvas.height - wallThreshold) {
            state.velocity.y *= (canvas.height - state.y) / wallThreshold
        }
    }

    // damp all velocities
    const dampingFactor = 0.95;
    for (const state of Q) {
        state.velocity.x *= dampingFactor;
        state.velocity.y *= dampingFactor;
    }

    // force q0 to have velocity 0
    if (q0) {
        q0.velocity.x = 0;
        q0.velocity.y = 0;
    }

    // update positions
    for (const state of Q) {
        state.x += state.velocity.x * dt;
        state.y += state.velocity.y * dt;
    }
}