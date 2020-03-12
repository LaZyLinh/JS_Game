const range = 5;  // range around particle that triggers interaction with qubit
const interact = 1; // energy gained/lost from interaction

class Qubit {

	constructor(particle) {
		this.particle = particle;
		this.haveInteracted = [];	// list of particles that qubit has interacted with
		this.x = width/5;
		this.y = height/3;
		this.ySpeed=0;
		this.scl=20;
	}

	// Rendering the Qubit
	update() {

		// If qubit collides with other particles, there's random 50-50 chance of absorption/emission
		for (let p = 0; p < this.particle.mass.length; p++) {

			// if qubit comes in range of a particle
			// wants only 1 interaction/particle, else constant update will cause too much erratic change of ySpeed
			if (!this.haveInteracted.includes(p) &&
				this.x > this.particle.positionX[p] - range && this.x < this.particle.positionX[p] + range
				&& this.y > this.particle.positionY[p] - range && this.y > this.particle.positionY[p] + range) {
				let num = int(random(0, 1));
				if (num === 0) {
					this.ySpeed -= interact;	// absorption by interact amount of energy
				} else {
					this.ySpeed += interact;	// emission by interact amount of energy
				}
				this.haveInteracted.push(p);
			}
		}
		
		this.ySpeed += gravity;
		this.y += this.ySpeed;
		
		this.x = constrain(this.x, 0, width-this.scl);
    this.y = constrain(this.y, 0, height-this.scl);
		
		fill(255,200,50);
		ellipse(this.x, this.y, this.scl, this.scl);
		
		fill(128,0,0);
		text("Q", this.x, this.y)
	}
	
	absorption(energy) {
		
		this.ySpeed -= energy;
	
	}
	
	emission(energy) {
		
		this.ySpeed += energy;
	
	}
	
	tunnel(path) {
		
		this.x += path;
		
	}


}