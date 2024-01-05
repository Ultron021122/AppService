const API = "http://10.0.2.2:3000"

export const getLogin = async (Usuario) => {
    const res = await fetch(`${API}/login/${Usuario}`);
    return await res.json()
}

export const getVisitors = async () => {
    const res = await fetch(`${API}/visitors`)
    return await res.json()
}

export const getVisitor = async (ID) => {
    const visitor = await fetch(`${API}/visitors/${ID}`);
    return await visitor.json();
}

export const saveVisitors = async (newVisitor) => {
    const res = await fetch(`${API}/visitors`, { 
        method: 'POST', 
        headers: { Accept: "application/json", "Content-Type": "application/json" }, 
        body: JSON.stringify(newVisitor) });
    return await res.json();
};

export const deleteVisitor = async (ID) => {
    await fetch(`${API}/visitors/${ID}`, {method: "DELETE",});
};

export const updateVisitor = async (ID, updateVisitor) => {
    const res = await fetch(`${API}/visitors/${ID}`, {
        method: 'PUT',
        headers: { Accept: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify(updateVisitor),
    })
    return res;
}