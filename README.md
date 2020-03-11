# JS_Game
Geering Up - Quantum Computing Software Developer Role

<b>Attempted option 1:</b> Add functionality to the buttons. Instead of simply using the arrow keys, modify the code such that your Qubit can move by pressing the buttons with the mouse:

The given code seemed to hint at canvas.addEventListener(), but I decided that an HTML button element would give much better click area calculation, as well as be much more efficient performance-wise in comparison to constant re-rendering of shapes in canvas. Also, given the css stylesheet, it is much easier to consistently update the appearance/position of these buttons with HTML objects.


<b>Added feature</b>: Reset button, (rudimentary) decaying probabilities of tunneling in resemblance to quantum tunneling theory:

A reset button was added so that players can restart the game without having to refresh browser. Some code refactoring was done to enable these changes. The wave function during quantum tunneling could have been calculated to decay proportionally to barrier width and proper wave function's decaying behavior, but given the amount of barriers, the proper decaying function most likely decays too fast to be fun. So I decided that the more rudimentary approach of probability decaying by 1/x (with x = 4 + # successful tunneling attempts) being a good enough punishment for those spamming the tunneling option! 


