import React from 'react';
import { CheckCircle } from "lucide-react";
const ChooseFeature = () => {
    const features=[
            { title: "World Class Trainers", desc: "Gravida dictum fusce placerat ultricies integer" },
            { title: "Easy Learning", desc: "Gravida dictum fusce placerat ultricies integer" },
            { title: "Flexible", desc: "Gravida dictum fusce placerat ultricies integer" },
            { title: "Affordable Price", desc: "Gravida dictum fusce placerat ultricies integer" },
          ]
    return (
           <div className="grid sm:grid-cols-2 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-emerald-50 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="text-emerald-500 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    );
};

export default ChooseFeature;