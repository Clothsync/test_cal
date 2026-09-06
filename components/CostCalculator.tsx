"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  Calculator,
  Package,
  RotateCcw,
  Truck
} from "lucide-react";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

export default function CostCalculator() {
  const [rmbRate, setRmbRate] = useState("14");
  const [cargoRate, setCargoRate] = useState("400");
  const [garmentPrice, setGarmentPrice] = useState("50");
  const [weightGram, setWeightGram] = useState("350");

  const calculation = useMemo(() => {
    const rate = Number(rmbRate) || 0;
    const cargoPerKg = Number(cargoRate) || 0;
    const priceRmb = Number(garmentPrice) || 0;
    const grams = Number(weightGram) || 0;

    const productCost = priceRmb * rate;
    const weightKg = grams / 1000;
    const cargoCost = weightKg * cargoPerKg;
    const finalCost = productCost + cargoCost;

    return {
      productCost,
      weightKg,
      cargoCost,
      finalCost
    };
  }, [rmbRate, cargoRate, garmentPrice, weightGram]);

  const resetCalculator = () => {
    setRmbRate("");
    setCargoRate("");
    setGarmentPrice("");
    setWeightGram("");
  };

  return (
    <main className="page">
      <div className="orb orbOne" />
      <div className="orb orbTwo" />

      <header className="navbar">
        <div className="brand">
          <div className="brandLogo">c</div>

          <div>
            <div className="brandName">
              cloth<span>.sync</span>
            </div>

            <div className="brandTagline">
              China → India sourcing
            </div>
          </div>
        </div>

        <div className="calculatorBadge">
          <span className="greenDot" />
          Cost Calculator
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">
          <Calculator size={15} />
          IMPORT COSTING TOOL
        </div>

        <h1>
          Know your garment cost
          <br />
          <span>in seconds.</span>
        </h1>

        <p>
          Enter your RMB rate, cargo rate, garment price and weight.
          Get an instant estimated cost per piece.
        </p>
      </section>

      <section className="calculatorLayout">
        <div className="inputCard">
          <div className="cardTitle">
            <div>
              <div className="sectionLabel">
                01 · RATE SETTINGS
              </div>

              <h2>Your current rates</h2>
            </div>
          </div>

          <div className="fieldGrid">
            <InputField
              label="RMB → INR Rate"
              prefix="¥"
              suffix="INR"
              value={rmbRate}
              placeholder="14.00"
              step="0.01"
              onChange={setRmbRate}
            />

            <InputField
              label="Cargo Rate / KG"
              prefix="₹"
              suffix="/ KG"
              value={cargoRate}
              placeholder="400"
              step="0.01"
              onChange={setCargoRate}
            />
          </div>

          <div className="divider" />

          <div className="cardTitle">
            <div>
              <div className="sectionLabel">
                02 · PRODUCT DETAILS
              </div>

              <h2>Garment information</h2>
            </div>
          </div>

          <div className="fieldGrid">
            <InputField
              label="Garment Price"
              prefix="¥"
              suffix="RMB"
              value={garmentPrice}
              placeholder="50.00"
              step="0.01"
              onChange={setGarmentPrice}
            />

            <InputField
              label="Garment Weight"
              prefix=""
              suffix="GRAM"
              value={weightGram}
              placeholder="350"
              step="1"
              onChange={setWeightGram}
            />
          </div>

          <button
            type="button"
            className="resetButton"
            onClick={resetCalculator}
          >
            <RotateCcw size={15} />
            Reset calculator
          </button>
        </div>

        <div className="resultCard">
          <div className="resultHeader">
            <div className="resultIcon">
              <Calculator size={20} />
            </div>

            <div>
              <div className="sectionLabel light">
                ESTIMATED COST
              </div>

              <h2>Cost per piece</h2>
            </div>
          </div>

          <div className="totalBox">
            <span>Total estimated cost</span>

            <strong>{formatINR(calculation.finalCost)}</strong>

            <small>per garment / piece</small>
          </div>

          <div className="breakdown">
            <BreakdownRow
              icon={<Package size={17} />}
              label="Product Cost"
              value={formatINR(calculation.productCost)}
            />

            <BreakdownRow
              icon={<Truck size={17} />}
              label={`Cargo Cost · ${calculation.weightKg.toFixed(3)} KG`}
              value={formatINR(calculation.cargoCost)}
            />
          </div>

          <div className="resultDivider" />

          <div className="finalRow">
            <span>Final estimated cost</span>
            <strong>{formatINR(calculation.finalCost)}</strong>
          </div>

          <div className="estimateNote">
            <ArrowDown size={14} />
            Estimate based on the rates you entered.
          </div>
        </div>
      </section>

      <footer>
        <span className="footerBrand">
          cloth<span>.sync</span>
        </span>

        <span>China sourcing made simpler.</span>
      </footer>
    </main>
  );
}

type InputFieldProps = {
  label: string;
  prefix: string;
  suffix: string;
  value: string;
  placeholder: string;
  step: string;
  onChange: (value: string) => void;
};

function InputField({
  label,
  prefix,
  suffix,
  value,
  placeholder,
  step,
  onChange
}: InputFieldProps) {
  return (
    <label className="field">
      <span className="fieldLabel">{label}</span>

      <div className="inputWrapper">
        {prefix && (
          <span className="inputPrefix">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          step={step}
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />

        <span className="inputSuffix">
          {suffix}
        </span>
      </div>
    </label>
  );
}

function BreakdownRow({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="breakdownRow">
      <div className="breakdownLabel">
        <span className="breakdownIcon">
          {icon}
        </span>

        {label}
      </div>

      <strong>{value}</strong>
    </div>
  );
}
