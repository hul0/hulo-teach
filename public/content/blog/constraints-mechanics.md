# 📘 Physics Mechanics Notes: Constraints & Generalized Coordinates

---

## ✅ **Constraints in Mechanics**

A **constraint** is a restriction on the motion of a system, limiting the ways in which particles or bodies can move.  
They reduce the number of **independent coordinates** required to describe the system.

---

## 🔹 **Types of Constraints**

### 1. **Holonomic Constraints**
- Expressible as an equation relating coordinates and possibly time.
- Form:  
  \[
  f(q_1, q_2, \dots, q_n, t) = 0
  \]
- These reduce the degrees of freedom (DOF) directly.

**Examples:**
- A bead constrained to move on a fixed wire:  
  \[
  f(x, y, z) = 0
  \]
- Pendulum of fixed length \(l\):  
  \[
  x^2 + y^2 - l^2 = 0
  \]

---

### 2. **Non-Holonomic Constraints**
- Not reducible to a finite equation of coordinates alone.
- Often inequalities or involve velocities.  
- Form:  
  \[
  f(q_1, q_2, \dots, q_n, \dot{q}_1, \dot{q}_2, \dots, t) \leq 0
  \]

**Examples:**
- Rolling without slipping:  
  \[
  v - R\omega = 0
  \]
- Knife edge constrained to move forward but not sideways.

---

## 🔹 **Examples of Constraints**

### ⚪ **Bead on a Wire**
- Constraint equation is the shape of the wire, e.g.  
  \[
  f(x,y) = y - g(x) = 0
  \]
- Motion restricted to 1 DOF along wire.

---

### ⚪ **Rolling Motion (Wheel/Ring on Plane)**
- Condition: **No slipping**  
  \[
  v_{\text{cm}} = R\omega
  \]
- Non-holonomic because it involves velocity relation.

---

### ⚪ **Pendulum with Moving Support**
- If the support moves horizontally with \(X(t)\):  
  \[
  (x - X(t))^2 + y^2 - l^2 = 0
  \]
- Constraint is still holonomic (depends only on coordinates + time).

---

## 🔹 **Generalized Coordinates (q\_i)**

- Any set of independent parameters that uniquely specify the configuration of a system.  
- Used when Cartesian coordinates are reduced by constraints.

### ✨ **Degrees of Freedom (DOF)**
- DOF = Total coordinates − Number of independent constraints
- Example:
  - Particle in 3D space → 3 DOF  
  - Particle constrained on a surface \(f(x,y,z)=0\) → 2 DOF  
  - Simple pendulum → 1 DOF (\(\theta\))

---

## 🔹 **Virtual Displacement (δr)**

- An **infinitesimal change** in the configuration consistent with the constraints, at a fixed instant of time.
- Not an actual motion → purely hypothetical, used in **principle of virtual work**.

**Mathematical form:**
\[
\delta r_i = \sum_{j=1}^{n} \frac{\partial r_i}{\partial q_j} \, \delta q_j
\]

---

## 🔹 **Generalized Forces (Q\_j)**

- Force components corresponding to generalized coordinates.
- Defined via **virtual work principle**:  
  \[
  \delta W = \sum_i \mathbf{F}_i \cdot \delta \mathbf{r}_i 
  = \sum_j Q_j \, \delta q_j
  \]
- Where:  
  \[
  Q_j = \sum_i \mathbf{F}_i \cdot \frac{\partial \mathbf{r}_i}{\partial q_j}
  \]

---

## 📌 **Summary Table**

| Concept                  | Definition | Example |
|---------------------------|------------|---------|
| Holonomic Constraint      | Equation involving coordinates/time | Bead on wire, Pendulum |
| Non-Holonomic Constraint  | Inequalities or velocity relations  | Rolling without slipping |
| DOF                      | Independent coordinates after constraints | Pendulum → 1 |
| Virtual Displacement      | Infinitesimal allowed displacement at fixed time | δθ for pendulum |
| Generalized Forces        | Work-conjugate to generalized coordinates | Torque in pendulum |

---

## 📝 **Key Takeaways**
- Constraints reduce motion freedom → define system’s DOF.
- Holonomic → coordinate equations; Non-holonomic → velocity/inequality relations.
- Generalized coordinates simplify mechanics → foundation of **Lagrangian mechanics**.
- Virtual displacement + generalized forces → connect Newtonian mechanics with Lagrangian framework.

---
