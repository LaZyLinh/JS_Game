# JS_Game
Geering Up - Quantum Computing Software Developer Role

<b>Attempted option 1:</b> Add functionality to the buttons. Instead of simply using the arrow keys, modify the code such that your Qubit can move by pressing the buttons with the mouse:

Altered: main.js, style.css

The given code seemed to hint at canvas.addEventListener(), but I decided that an HTML button element would give much better click area calculation, as well as be much more efficient performance-wise in comparison to constant re-rendering of shapes in canvas. Also, given the css stylesheet, it is much easier to consistently update the appearance/position of these buttons with HTML objects. Furthermore, a player's complaint could be that the buttons block the game screen. Having these buttons as HTML objects would allow for moving them outside of canvas for better player experience.


<b>Added features:</b> Reset button, (rudimentary) decaying probabilities of tunneling in resemblance to quantum tunneling theory:

Altered: main.js, style.css

A reset button was added so that players can restart the game without having to refresh browser. Some code refactoring was done to enable these changes. The chance of successful tunneling is changed to decrease over time. The wave function during tunneling could have been calculated to decay proportionally to barrier width and proper wave function's decaying behavior, but given the amount of barriers, the proper decaying function most likely decays too fast to be fun. So I decided that the more rudimentary approach of probability decaying by 1/x (with x = 4 + # successful tunneling attempts) being a good enough punishment for those spamming the tunneling option! 

<b>Extra - Also attempted option 2:</b>  Interacting Qubits:

Altered: main.js, qubit.js

The reference of particle is passed to player's Qubit instance. Whenever qubit comes in range of another particle, it will either absorb or emit energy with 50-50 chance. The interaction energy is easily changeable, and could make the game more difficult over time with more particles on screen (however, interaction only happens once per particle, which makes it less erractic). These interactions would cause difficulty controlling the qubit, thus demostrate the sensitivity of quantum systems to environment perturbations. 


