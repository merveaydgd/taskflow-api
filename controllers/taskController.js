// Geçici bellek (In-memory) veri tabanı
let tasks = [
    {
        id: "1",
        title: "API Tasarım Dokümanı Hazırla",
        description: "Proje endpoint'leri ve veri modelleri çıkarılacak.",
        priority: "high",
        status: "pending",
        assignee: "musa",
        createdAt: new Date()
    }
];

// Tüm görevleri listele
exports.getAllTasks = (req, res) => {
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
};

// ID'ye göre tek görev getir (Detay)
exports.getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ success: false, message: "Görev bulunamadı!" });
    }
    res.status(200).json({ success: true, data: task });
};

// Yeni görev ekle
exports.createTask = (req, res) => {
    const { title, description, priority, status, assignee } = req.body;

    if (!title || !assignee) {
        return res.status(400).json({ success: false, message: "Başlık (title) ve atanan kişi (assignee) zorunludur!" });
    }

    const newTask = {
        id: Date.now().toString(),
        title,
        description: description || "",
        priority: priority || "medium",
        status: status || "pending",
        assignee,
        createdAt: new Date()
    };

    tasks.push(newTask);
    res.status(201).json({ success: true, message: "Görev başarıyla eklendi.", data: newTask });
};

// Görev güncelle
exports.updateTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ success: false, message: "Güncellenecek görev bulunamadı!" });
    }

    const { title, description, priority, status, assignee } = req.body;

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description: description !== undefined ? description : tasks[taskIndex].description,
        priority: priority || tasks[taskIndex].priority,
        status: status || tasks[taskIndex].status,
        assignee: assignee || tasks[taskIndex].assignee
    };

    res.status(200).json({ success: true, message: "Görev güncellendi.", data: tasks[taskIndex] });
};

// Görev sil
exports.deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ success: false, message: "Silinecek görev bulunamadı!" });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json({ success: true, message: "Görev sistemden kaldırıldı.", data: deletedTask });
};