class ValorantAgent {
  constructor(name, role, image) {
    this.name = name;
    this.role = role;
    this.image = image;
    this.element = this.createAgentCard();
  }

  createAgentCard() {
    const card = document.createElement("div");
    card.className = "agent-card";

    const img = document.createElement("img");
    img.src = this.image;
    img.alt = `${this.name} Portrait`;
    img.className = "agent-image";

    const info = document.createElement("div");
    info.className = "agent-info";

    const name = document.createElement("div");
    name.className = "agent-name";
    name.textContent = this.name;

    const role = document.createElement("div");
    role.className = "agent-role";
    role.textContent = this.role;

    info.appendChild(name);
    info.appendChild(role);

    card.appendChild(img);
    card.appendChild(info);

    return card;
  }

  render(container) {
    container.appendChild(this.element);
  }
}

async function fetchValorantAgents() {
  try {
    const response = await fetch(
      "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Valorant agents:", error);
    return [];
  }
}

async function initializeAgentCards() {
  const container = document.getElementById("agent-container");
  const agents = await fetchValorantAgents();

  agents.forEach((agent) => {
    const valorantAgent = new ValorantAgent(
      agent.displayName,
      agent.role.displayName,
      agent.fullPortraitV2
    );
    valorantAgent.render(container);
  });
}

initializeAgentCards();
