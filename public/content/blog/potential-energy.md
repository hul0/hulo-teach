# 📘 Physics Mechanics Notes: Potential Energy, Work, and Stability

---

## 🔹 **Potential Energy ($U$)**

Potential energy represents the **stored energy** of a system due to its position or configuration in a force field.

* For a particle under a force $\mathbf{F}$:

  $$
  \mathbf{F} = - \nabla U
  $$

  This means the force points in the direction of decreasing potential energy.

**Examples:**

* Gravitational potential energy: $U = mgh$
* Elastic spring energy: $U = \tfrac{1}{2}kx^2$

---

## 🔹 **Conservative vs. Non-Conservative Forces**

### ✅ Conservative Forces

* Work done is **path independent**, depends only on initial and final positions.
* Work done around a closed loop = **0**.
* Examples: Gravity, spring force, electrostatic force.

Mathematically:

$$
\oint \mathbf{F}\cdot d\mathbf{r} = 0 \quad \Rightarrow \quad \mathbf{F} = -\nabla U
$$

### ❌ Non-Conservative Forces

* Work done is **path dependent**.
* Energy is **dissipated** (e.g., as heat, sound).
* Examples: Friction, air resistance, viscous drag.

---

## 🔹 **Work-Energy Theorem**

The **work-energy theorem** states:

$$
W_{\text{net}} = \Delta K
$$

where $K = \tfrac{1}{2}mv^2$ is the kinetic energy.

* If only conservative forces act:

  $$
  \Delta K + \Delta U = 0 \quad \Rightarrow \quad E = K + U = \text{constant}
  $$

* If non-conservative forces (like friction) are present:

  $$
  \Delta K + \Delta U = W_{\text{nc}}
  $$

---

## 🔹 **Equilibrium and Stability**

A system is in **equilibrium** if the net force (or net torque) is zero.  
The nature of equilibrium depends on the behavior of potential energy near the point.

### 1. **Stable Equilibrium**

* A small displacement increases $U$.
* System tends to return to equilibrium.
* Condition:

  $$
  \frac{dU}{dx} = 0, \quad \frac{d^2U}{dx^2} > 0
  $$

* Example: Pendulum at its lowest point.

### 2. **Unstable Equilibrium**

* A small displacement decreases $U$.
* System moves further away.
* Condition:

  $$
  \frac{dU}{dx} = 0, \quad \frac{d^2U}{dx^2} < 0
  $$

* Example: Inverted pendulum at the top.

### 3. **Neutral Equilibrium**

* Small displacement leaves $U$ unchanged.
* Condition:

  $$
  \frac{dU}{dx} = 0, \quad \frac{d^2U}{dx^2} = 0
  $$

* Example: Ball on a perfectly flat surface.

---

## 🔹 **Small Oscillations Analysis**

When a system is displaced slightly from **stable equilibrium**, it undergoes **small oscillations**.

1. Expand potential energy around equilibrium ($x_0$):

   $$
   U(x) \approx U(x_0) + \tfrac{1}{2}k(x-x_0)^2
   $$

   where $k = \left.\frac{d^2U}{dx^2}\right|_{x_0}$

2. Equation of motion:

   $$
   m\ddot{x} + k(x-x_0) = 0
   $$

3. Solution is **simple harmonic motion (SHM):**

   $$
   x(t) = A\cos(\omega t + \phi), \quad \omega = \sqrt{\tfrac{k}{m}}
   $$

**Examples:**

* Pendulum near equilibrium → small $\theta$ → motion approximately SHM.
* Spring-mass system → exact SHM.

---

## 📌 **Summary Table**

| Concept                | Key Idea                                | Formula                                 | Example                             |
| ---------------------- | --------------------------------------- | --------------------------------------- | ----------------------------------- |
| Potential Energy       | Stored energy in position/configuration | $\mathbf{F} = -\nabla U$                | $U = mgh$, $U=\tfrac{1}{2}kx^2$     |
| Conservative Force     | Path-independent, energy-conserving     | $\oint \mathbf{F}\cdot d\mathbf{r}=0$   | Gravity, spring                     |
| Non-Conservative Force | Path-dependent, dissipative             | $W_{\text{nc}} \neq 0$                  | Friction, drag                      |
| Work-Energy Theorem    | Net work = change in kinetic energy     | $W_{\text{net}}=\Delta K$               | Pushing a box                       |
| Stable Equilibrium     | Restoring behavior                      | $d^2U/dx^2>0$                           | Pendulum bottom                     |
| Unstable Equilibrium   | Diverging behavior                      | $d^2U/dx^2<0$                           | Pendulum top                        |
| Neutral Equilibrium    | Energy unchanged                        | $d^2U/dx^2=0$                           | Ball on flat floor                  |
| Small Oscillations     | SHM near equilibrium                    | $\omega=\sqrt{k/m}$                     | Spring-mass system                  |

---
