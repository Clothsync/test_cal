"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  Package,
  RotateCcw,
  Truck,
  TrendingUp,
} from "lucide-react";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
      finalCost,
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

        <div className="desktopBadge">
          <span className="greenDot" />
          Live Calculator
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">
          <Calculator size={15} />
          IMPORT COSTING TOOL
        </div>

        <h1>
          Calculate your
          <br />
          <span>landed cost.</span>
        </h1>

        <p>
          Calculate product cost and cargo cost instantly.
        </p>
      </section>

      <section className="calculatorLayout">
        {/* INPUT SECTION */}
        <div className="inputCard">

          <div className="mobileTitle">
            <div className="mobileIcon">
              <Calculator size={18} />
            </div>

            <div>
              <h2>Cost Calculator</h2>
              <p>China → India import costing</p>
            </div>
          </div>

          <div className="desktopSection">
            <div className="sectionLabel">
              01 · RATE SETTINGS
            </div>

            <h2>Your current rates</h2>
          </div>

          <div className="fieldGrid">
            <InputField
              label="RMB Rate"
              prefix="¥"
              suffix="INR"
              value={rmbRate}
              placeholder="14"
              step="0.01"
              onChange={setRmbRate}
            />

            <InputField
              label="Cargo / KG"
              prefix="₹"
              suffix="KG"
              value={cargoRate}
              placeholder="400"
              step="0.01"
              onChange={setCargoRate}
            />
          </div>

          <div className="divider" />

          <div className="desktopSection">
            <div className="sectionLabel">
              02 · PRODUCT DETAILS
            </div>

            <h2>Garment information</h2>
          </div>

          <div className="fieldGrid">
            <InputField
              label="Garment Price"
              prefix="¥"
              suffix="RMB"
              value={garmentPrice}
              placeholder="50"
              step="0.01"
              onChange={setGarmentPrice}
            />

            <InputField
              label="Weight"
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
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        {/* RESULT SECTION */}
        <div className="resultCard">

          <div className="resultHeader">
            <div className="resultIcon">
              <TrendingUp size={19} />
            </div>

            <div>
              <div className="sectionLabel light">
                ESTIMATED COST
              </div>

              <h2>Cost per piece</h2>
            </div>
          </div>

          <div className="totalBox">
            <span>Total Cost / Piece</span>

            <strong>
              {formatINR(calculation.finalCost)}
            </strong>

            <small>
              Including product + cargo
            </small>
          </div>

          <div className="breakdown">

            <BreakdownRow
              icon={<Package size={16} />}
              label="Product Cost"
              value={formatINR(calculation.productCost)}
            />

            <BreakdownRow
              icon={<Truck size={16} />}
              label={`Cargo · ${calculation.weightKg.toFixed(3)} KG`}
              value={formatINR(calculation.cargoCost)}
            />

          </div>

          <div className="finalRow">
            <span>Final Amount</span>

            <strong>
              {formatINR(calculation.finalCost)}
            </strong>
          </div>
        </div>
      </section>

      <footer>
        <span className="footerBrand">
          cloth<span>.sync</span>
        </span>

        <span>
          China sourcing made simpler.
        </span>
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
  onChange,
}: InputFieldProps) {
  return (
    <label className="field">

      <span className="fieldLabel">
        {label}
      </span>

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
          onChange={(event) =>
            onChange(event.target.value)
          }
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
  value,
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
