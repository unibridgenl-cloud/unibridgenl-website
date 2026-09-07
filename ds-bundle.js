/* @ds-bundle: {"format":4,"namespace":"UnibridgeNLDesignSystem_3cb2d1","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"f223777f6673","components/core/Button.jsx":"350c0d1da1b2","components/core/Card.jsx":"c7f657f24177","components/core/Icon.jsx":"14c93a188811","components/core/IconButton.jsx":"f81aa509ce32","components/core/Logo.jsx":"845b6bc61950","components/core/Tag.jsx":"635466ef8fa4","components/feedback/Alert.jsx":"b40f0eeceba1","components/feedback/Dialog.jsx":"f4d0ffb375a0","components/feedback/Toast.jsx":"ccd03250818e","components/feedback/Tooltip.jsx":"2fb199985aa4","components/forms/Checkbox.jsx":"55ca01c37bb8","components/forms/Field.jsx":"6d8a82ee3697","components/forms/Input.jsx":"63d48e767532","components/forms/Radio.jsx":"b0cf864cab73","components/forms/Select.jsx":"35deb17b5c96","components/forms/Switch.jsx":"34a0aee92525","components/forms/Textarea.jsx":"88b0c4453f85","components/navigation/Stepper.jsx":"8b5af7a9c83a","components/navigation/Tabs.jsx":"bd5c106e01e6","ui_kits/dashboard/DocumentsScreen.jsx":"6d017e48cbe8","ui_kits/dashboard/HousingScreen.jsx":"fd6b02150a42","ui_kits/dashboard/OverviewScreen.jsx":"b223bd62c7f9","ui_kits/dashboard/Shell.jsx":"e947ba42cac3","ui_kits/website/ApplyScreen.jsx":"9fb7324ab335","ui_kits/website/BookCallScreen.jsx":"6a79bee55548","ui_kits/website/Chrome.jsx":"5023f348634b","ui_kits/website/HomeScreen.jsx":"c92175188ce0","ui_kits/website/ServicesScreen.jsx":"17b35e46976a","ui_kits/website/UniversitiesScreen.jsx":"4e577307dafb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.UnibridgeNLDesignSystem_3cb2d1 = window.UnibridgeNLDesignSystem_3cb2d1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const T = {
  neutral: {
    bg: "var(--status-info-bg)",
    fg: "var(--status-info-fg)"
  },
  success: {
    bg: "var(--status-success-bg)",
    fg: "var(--status-success-fg)"
  },
  warning: {
    bg: "var(--status-warning-bg)",
    fg: "var(--status-warning-fg)"
  },
  danger: {
    bg: "var(--status-danger-bg)",
    fg: "var(--status-danger-fg)"
  },
  accent: {
    bg: "var(--gold-500)",
    fg: "var(--text-on-accent)"
  }
};
function Badge({
  tone = "neutral",
  dot = false,
  children,
  style
}) {
  const t = T[tone] || T.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: t.bg,
      color: t.fg,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "0.02em",
      padding: "3px 10px",
      borderRadius: "var(--radius-pill)",
      whiteSpace: "nowrap",
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "var(--radius-pill)",
      background: "currentColor"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const V = {
  primary: {
    bg: "var(--gold-500)",
    fg: "var(--text-on-accent)",
    bd: "var(--gold-500)",
    hoverBg: "var(--gold-700)",
    hoverBd: "var(--gold-700)"
  },
  secondary: {
    bg: "transparent",
    fg: "var(--ink-900)",
    bd: "var(--ink-900)",
    hoverBg: "var(--ink-900)",
    hoverBd: "var(--ink-900)",
    hoverFg: "var(--cream-200)"
  },
  clay: {
    bg: "var(--clay-500)",
    fg: "var(--text-on-accent)",
    bd: "var(--clay-500)",
    hoverBg: "var(--clay-700)",
    hoverBd: "var(--clay-700)"
  },
  ghost: {
    bg: "transparent",
    fg: "var(--ink-700)",
    bd: "transparent",
    hoverBg: "var(--cream-300)",
    hoverBd: "transparent"
  }
};
const S = {
  sm: {
    height: "var(--control-height-sm)",
    padding: "0 14px",
    fontSize: "var(--text-body-sm)"
  },
  md: {
    height: "var(--field-height)",
    padding: "0 20px",
    fontSize: "var(--text-body)"
  },
  lg: {
    height: "52px",
    padding: "0 28px",
    fontSize: "var(--text-body-lg)"
  }
};
function Button({
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  type = "button",
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = V[variant] || V.primary;
  const s = S[size] || S.md;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      width: full ? "100%" : "auto",
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "0.01em",
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      border: "1px solid " + (hover && !disabled ? v.hoverBd || v.bd : v.bd),
      background: hover && !disabled ? v.hoverBg : v.bg,
      color: hover && !disabled ? v.hoverFg || v.fg : v.fg,
      opacity: disabled ? 0.45 : 1,
      transform: press && !disabled ? "scale(var(--motion-press-scale))" : "none",
      transition: "var(--transition-control)",
      ...style
    }
  }, iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  tone = "paper",
  elevation = "sm",
  interactive = false,
  padding = "var(--space-6)",
  rule = false,
  onClick,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const bg = tone === "cream" ? "var(--surface-page)" : tone === "sunken" ? "var(--surface-sunken)" : tone === "ink" ? "var(--surface-inverse)" : "var(--surface-card)";
  const shadows = {
    none: "none",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)"
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: bg,
      color: tone === "ink" ? "var(--text-on-inverse)" : "var(--text-body)",
      border: "1px solid " + (tone === "ink" ? "transparent" : hover && interactive ? "var(--border-accent)" : "var(--border-hairline)"),
      borderRadius: "var(--radius-card)",
      padding,
      boxShadow: interactive && hover ? "var(--shadow-md)" : shadows[elevation],
      transform: interactive && hover ? "translateY(-2px)" : "none",
      cursor: interactive ? "pointer" : "default",
      transition: "box-shadow var(--duration-base) var(--ease-standard),transform var(--duration-base) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)",
      ...style
    }
  }, rule && /*#__PURE__*/React.createElement("hr", {
    style: {
      height: 1,
      background: "var(--divider-rule)",
      border: 0,
      margin: "0 0 var(--space-4)",
      width: 56
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const BASE = "https://unpkg.com/lucide-static@0.544.0/icons/";

/** Renders a Lucide outline glyph as a CSS mask so it inherits currentColor. */
function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeAlign,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-hidden": "true",
    "data-icon": name,
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "0 0 auto",
      background: color,
      WebkitMaskImage: "url(" + BASE + name + ".svg)",
      maskImage: "url(" + BASE + name + ".svg)",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      verticalAlign: strokeAlign === "text" ? "-0.15em" : "middle",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  name,
  label,
  size = "md",
  variant = "ghost",
  onClick,
  disabled = false,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const box = size === "sm" ? 34 : size === "lg" ? 48 : 44;
  const filled = variant === "filled";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: box,
      height: box,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      border: "1px solid " + (filled ? "var(--gold-500)" : hover ? "var(--border-hairline)" : "transparent"),
      background: filled ? hover ? "var(--gold-700)" : "var(--gold-500)" : hover ? "var(--cream-300)" : "transparent",
      color: filled ? "var(--text-on-accent)" : "var(--ink-700)",
      opacity: disabled ? 0.45 : 1,
      transition: "var(--transition-control)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: size === "sm" ? 16 : 20
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
/** Wordmark lockup. `badge` renders the circular logo image; `wordmark` is type-only. */
function Logo({
  variant = "wordmark",
  size = 40,
  tagline = false,
  tone = "ink",
  src = "/assets/logo-badge.jpg",
  style
}) {
  const fg = tone === "cream" ? "var(--cream-200)" : "var(--ink-900)";
  if (variant === "badge") {
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: "UniBridge NL",
      style: {
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        display: "block",
        ...style
      }
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      gap: 2,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontVariationSettings: "var(--display-variation)",
      fontWeight: "var(--weight-semibold)",
      fontSize: size * 0.55,
      lineHeight: 1,
      letterSpacing: "var(--tracking-tight)",
      color: fg
    }
  }, "UniBridge ", /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: "0.02em"
    }
  }, "NL")), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: Math.max(9, size * 0.2),
      letterSpacing: "var(--tracking-overline)",
      textTransform: "uppercase",
      color: tone === "cream" ? "var(--ink-100)" : "var(--text-muted)"
    }
  }, "Your bridge to student life in the Netherlands"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  tone = "moss",
  selected = false,
  onSelect,
  onRemove,
  children,
  style
}) {
  const palette = {
    moss: ["var(--moss-500)", "var(--surface-tertiary-soft)"],
    gold: ["var(--gold-700)", "var(--surface-accent-soft)"],
    clay: ["var(--clay-700)", "var(--surface-secondary-soft)"]
  };
  const [fg, softBg] = palette[tone] || palette.moss;
  const clickable = !!onSelect;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onSelect,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: selected ? fg : softBg,
      color: selected ? "var(--cream-100)" : fg,
      border: "1px solid " + (selected ? fg : "transparent"),
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body-sm)",
      fontWeight: "var(--weight-medium)",
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      cursor: clickable ? "pointer" : "default",
      transition: "var(--transition-control)",
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: "inline-flex",
      cursor: "pointer",
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const T = {
  info: {
    icon: "info",
    fg: "var(--status-info-fg)",
    bg: "var(--status-info-bg)",
    bd: "var(--border-hairline)"
  },
  success: {
    icon: "circle-check",
    fg: "var(--status-success-fg)",
    bg: "var(--status-success-bg)",
    bd: "var(--moss-300)"
  },
  warning: {
    icon: "triangle-alert",
    fg: "var(--status-warning-fg)",
    bg: "var(--status-warning-bg)",
    bd: "var(--gold-300)"
  },
  danger: {
    icon: "circle-alert",
    fg: "var(--status-danger-fg)",
    bg: "var(--status-danger-bg)",
    bd: "var(--clay-300)"
  }
};
function Alert({
  tone = "info",
  title,
  action,
  children,
  style
}) {
  const t = T[tone] || T.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "flex-start",
      background: t.bg,
      border: "1px solid " + t.bd,
      borderRadius: "var(--radius-md)",
      padding: "var(--space-4) var(--space-5)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.fg,
      display: "flex",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 19
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body-sm)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-heading)",
      marginBottom: 2
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--text-body)"
    }
  }, children)), action);
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = true,
  title,
  description,
  footer,
  onClose,
  width = 460,
  children,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-6)",
      background: "var(--overlay-scrim)",
      backdropFilter: "blur(2px)",
      borderRadius: "inherit",
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)",
      padding: "var(--space-6)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontVariationSettings: "var(--display-variation)",
      fontSize: "var(--text-h3)",
      color: "var(--text-heading)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-2) 0 0",
      fontSize: "var(--text-body-sm)",
      color: "var(--text-muted)"
    }
  }, description)), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "x",
    label: "Close",
    size: "sm",
    onClick: onClose
  })), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-5)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)",
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--space-3)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const T = {
  success: {
    icon: "circle-check",
    fg: "var(--status-success-fg)",
    bg: "var(--status-success-bg)"
  },
  info: {
    icon: "info",
    fg: "var(--status-info-fg)",
    bg: "var(--surface-card)"
  },
  warning: {
    icon: "triangle-alert",
    fg: "var(--status-warning-fg)",
    bg: "var(--status-warning-bg)"
  },
  danger: {
    icon: "circle-alert",
    fg: "var(--status-danger-fg)",
    bg: "var(--status-danger-bg)"
  }
};
function Toast({
  tone = "success",
  title,
  message,
  onClose,
  style
}) {
  const t = T[tone] || T.success;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "flex-start",
      minWidth: 280,
      maxWidth: 420,
      background: t.bg,
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-md)",
      padding: "var(--space-4)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.fg,
      display: "flex",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 19
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body-sm)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-heading)"
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--text-muted)"
    }
  }, message)), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "x",
    label: "Dismiss",
    size: "sm",
    onClick: onClose
  }));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  placement = "top",
  children,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      whiteSpace: "nowrap",
      pointerEvents: "none",
      background: "var(--ink-900)",
      color: "var(--cream-200)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      fontWeight: "var(--weight-medium)",
      padding: "6px 10px",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-md)",
      opacity: open ? 1 : 0,
      transition: "opacity var(--duration-fast) var(--ease-standard)",
      zIndex: 30
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  defaultChecked,
  label,
  description,
  disabled = false,
  onChange,
  style
}) {
  const controlled = checked !== undefined;
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = controlled ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (!controlled) setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: description ? "flex-start" : "center",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-xs)",
      background: on ? "var(--gold-500)" : "var(--surface-card)",
      border: "1px solid " + (on ? "var(--gold-500)" : "var(--border-default)"),
      color: "var(--text-on-accent)",
      transition: "var(--transition-control)",
      marginTop: description ? 2 : 0
    }
  }, on && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14
  })), /*#__PURE__*/React.createElement("span", null, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-body)",
      color: "var(--text-heading)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-body-sm)",
      color: "var(--text-muted)"
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-heading)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--clay-500)"
    }
  }, " *")), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      color: error ? "var(--status-danger-fg)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  value,
  defaultValue,
  placeholder,
  type = "text",
  iconLeft,
  invalid = false,
  disabled = false,
  onChange,
  id,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 14,
      display: "flex",
      color: "var(--text-subtle)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: 17
  })), /*#__PURE__*/React.createElement("input", {
    id: id,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      height: "var(--field-height)",
      padding: iconLeft ? "0 14px 0 40px" : "0 14px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      color: "var(--text-heading)",
      background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
      border: "1px solid " + (invalid ? "var(--clay-500)" : focus ? "var(--gold-500)" : "var(--border-default)"),
      borderRadius: "var(--radius-control)",
      outline: "none",
      boxShadow: focus && !invalid ? "var(--shadow-focus)" : "none",
      transition: "var(--transition-control)"
    }
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  options = [],
  value,
  defaultValue,
  name = "radio",
  direction = "column",
  onChange,
  style
}) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const current = controlled ? value : inner;
  const pick = v => {
    if (!controlled) setInner(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: direction,
      gap: direction === "row" ? "var(--space-5)" : "var(--space-3)",
      ...style
    }
  }, options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    const on = current === v;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      onClick: () => pick(v),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: "var(--radius-pill)",
        flex: "0 0 auto",
        border: "1px solid " + (on ? "var(--gold-500)" : "var(--border-default)"),
        background: "var(--surface-card)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "var(--transition-control)"
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: "var(--radius-pill)",
        background: "var(--gold-500)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-body)",
        color: "var(--text-heading)"
      }
    }, l), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      checked: on,
      readOnly: true,
      style: {
        display: "none"
      }
    }));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  value,
  defaultValue,
  options = [],
  placeholder,
  disabled = false,
  invalid = false,
  onChange,
  id,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: id,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      height: "var(--field-height)",
      padding: "0 40px 0 14px",
      appearance: "none",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      color: "var(--text-heading)",
      background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
      border: "1px solid " + (invalid ? "var(--clay-500)" : focus ? "var(--gold-500)" : "var(--border-default)"),
      borderRadius: "var(--radius-control)",
      outline: "none",
      boxShadow: focus && !invalid ? "var(--shadow-focus)" : "none",
      transition: "var(--transition-control)",
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-muted)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 17
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  defaultChecked,
  label,
  disabled = false,
  onChange,
  style
}) {
  const controlled = checked !== undefined;
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = controlled ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (!controlled) setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 26,
      borderRadius: "var(--radius-pill)",
      padding: 3,
      flex: "0 0 auto",
      background: on ? "var(--moss-500)" : "var(--cream-400)",
      transition: "background-color var(--duration-base) var(--ease-standard)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-pill)",
      background: "var(--cream-100)",
      boxShadow: "var(--shadow-xs)",
      transform: on ? "translateX(18px)" : "translateX(0)",
      transition: "transform var(--duration-base) var(--ease-out)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body)",
      color: "var(--text-heading)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function Textarea({
  value,
  defaultValue,
  placeholder,
  rows = 4,
  invalid = false,
  disabled = false,
  onChange,
  id,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", {
    id: id,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      padding: "12px 14px",
      resize: "vertical",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-heading)",
      background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
      border: "1px solid " + (invalid ? "var(--clay-500)" : focus ? "var(--gold-500)" : "var(--border-default)"),
      borderRadius: "var(--radius-control)",
      outline: "none",
      boxShadow: focus && !invalid ? "var(--shadow-focus)" : "none",
      transition: "var(--transition-control)",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Stepper.jsx
try { (() => {
function Stepper({
  steps = [],
  current = 0,
  orientation = "horizontal",
  style
}) {
  const horizontal = orientation === "horizontal";
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: horizontal ? "row" : "column",
      gap: horizontal ? "var(--space-2)" : "var(--space-4)",
      ...style
    }
  }, steps.map((s, i) => {
    const label = typeof s === "string" ? s : s.label;
    const meta = typeof s === "object" ? s.meta : undefined;
    const done = i < current,
      active = i === current;
    const ring = done ? "var(--moss-500)" : active ? "var(--gold-500)" : "var(--border-default)";
    return /*#__PURE__*/React.createElement("li", {
      key: label,
      style: {
        flex: horizontal ? 1 : "none",
        display: "flex",
        flexDirection: horizontal ? "column" : "row",
        gap: "var(--space-3)",
        alignItems: horizontal ? "stretch" : "center"
      }
    }, horizontal && /*#__PURE__*/React.createElement("span", {
      style: {
        height: 3,
        borderRadius: "var(--radius-pill)",
        background: done ? "var(--moss-500)" : active ? "var(--gold-500)" : "var(--cream-400)"
      }
    }), !horizontal && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        flex: "0 0 auto",
        borderRadius: "var(--radius-pill)",
        border: "1px solid " + ring,
        background: done ? "var(--moss-500)" : "var(--surface-card)",
        color: done ? "var(--cream-100)" : "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "var(--text-caption)",
        fontWeight: "var(--weight-bold)"
      }
    }, done ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 14
    }) : i + 1), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body-sm)",
        fontWeight: active ? "var(--weight-bold)" : "var(--weight-medium)",
        color: active || done ? "var(--text-heading)" : "var(--text-subtle)"
      }
    }, label), meta && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontSize: "var(--text-caption)",
        color: "var(--text-muted)"
      }
    }, meta)));
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  defaultValue,
  variant = "underline",
  onChange,
  style
}) {
  const first = typeof items[0] === "string" ? items[0] : items[0] && items[0].value;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue ?? first);
  const current = controlled ? value : inner;
  const pick = v => {
    if (!controlled) setInner(v);
    onChange && onChange(v);
  };
  const pill = variant === "pill";
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: pill ? "var(--space-1)" : "var(--space-6)",
      background: pill ? "var(--surface-sunken)" : "transparent",
      padding: pill ? 4 : 0,
      borderRadius: pill ? "var(--radius-pill)" : 0,
      borderBottom: pill ? "none" : "1px solid var(--border-hairline)",
      ...style
    }
  }, items.map(it => {
    const v = typeof it === "string" ? it : it.value;
    const l = typeof it === "string" ? it : it.label;
    const count = typeof it === "object" ? it.count : undefined;
    const on = current === v;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(v),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body-sm)",
        fontWeight: on ? "var(--weight-bold)" : "var(--weight-medium)",
        color: on ? pill ? "var(--ink-900)" : "var(--text-heading)" : "var(--text-muted)",
        background: pill ? on ? "var(--surface-card)" : "transparent" : "transparent",
        boxShadow: pill && on ? "var(--shadow-xs)" : "none",
        padding: pill ? "8px 16px" : "0 0 12px",
        borderRadius: pill ? "var(--radius-pill)" : 0,
        borderBottom: pill ? "none" : "2px solid " + (on ? "var(--gold-500)" : "transparent"),
        marginBottom: pill ? 0 : -1,
        transition: "var(--transition-control)"
      }
    }, l, count !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-caption)",
        color: "var(--text-subtle)"
      }
    }, count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/DocumentsScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Badge,
  Tabs,
  Icon,
  IconButton,
  Tooltip,
  Field,
  Select,
  Alert
} = window.UnibridgeNLDesignSystem_3cb2d1;
const DOCS = [{
  n: "Passport (photo page)",
  s: "Approved",
  tone: "success",
  meta: "PDF · 1.2 MB · checked 28 Sep"
}, {
  n: "Secondary school diploma",
  s: "Needs certified copy",
  tone: "warning",
  meta: "PDF · 2.4 MB · uploaded 30 Sep"
}, {
  n: "Transcript of grades",
  s: "Approved",
  tone: "success",
  meta: "PDF · 800 KB · checked 29 Sep"
}, {
  n: "Proof of funds",
  s: "Missing",
  tone: "danger",
  meta: "Bank letter, less than 3 months old"
}, {
  n: "Passport photo",
  s: "Approved",
  tone: "success",
  meta: "JPG · 420 KB · checked 28 Sep"
}];
function DocumentsScreen({
  onUpload
}) {
  const [tab, setTab] = React.useState("all");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-8) var(--space-10) var(--space-16)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "info",
    title: "What 'certified' means here"
  }, "A copy stamped by your school, a notary or a Dutch embassy. A phone photo of the original is not enough for UvA."), /*#__PURE__*/React.createElement(Card, {
    padding: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "all",
      label: "All",
      count: 5
    }, {
      value: "open",
      label: "Needs action",
      count: 2
    }, {
      value: "done",
      label: "Approved",
      count: 3
    }],
    value: tab,
    onChange: setTab,
    style: {
      border: 'none'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: onUpload,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "upload",
      size: 16
    })
  }, "Upload document")), DOCS.filter(d => tab === 'all' || (tab === 'open' ? d.tone !== 'success' : d.tone === 'success')).map(d => /*#__PURE__*/React.createElement("div", {
    key: d.n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) var(--space-6)',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-sunken)',
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 19
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      color: 'var(--text-heading)'
    }
  }, d.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, d.meta)), /*#__PURE__*/React.createElement(Badge, {
    tone: d.tone,
    dot: d.tone !== 'success'
  }, d.s), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Download"
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "download",
    label: "Download",
    size: "sm"
  })), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Replace file"
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "refresh-cw",
    label: "Replace",
    size: "sm",
    onClick: onUpload
  }))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 4px'
    }
  }, "Send documents to a university"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, "We forward certified copies only \u2014 originals never leave your hands.")), /*#__PURE__*/React.createElement(Field, {
    label: "University",
    style: {
      width: 260
    }
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "University of Amsterdam",
    options: ["University of Amsterdam", "Utrecht University"]
  })), /*#__PURE__*/React.createElement(Button, {
    style: {
      alignSelf: 'flex-end'
    }
  }, "Forward 3 files")));
}
Object.assign(window, {
  DocumentsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/DocumentsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/HousingScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Badge,
  Tag,
  Icon,
  Switch,
  Select,
  Field,
  Alert,
  Tooltip
} = window.UnibridgeNLDesignSystem_3cb2d1;
const ROOMS = [{
  n: "Studio · Oost",
  price: "€895",
  meta: "22 m² · own kitchen · 12 min by bike",
  state: "Offer open",
  tone: "warning",
  tags: ["Furnished", "Registration allowed"]
}, {
  n: "Room in shared house · Nieuw-West",
  price: "€665",
  meta: "14 m² · 3 flatmates · 18 min by bike",
  state: "Available",
  tone: "neutral",
  tags: ["Furnished", "Bills included"]
}, {
  n: "Studio · Noord",
  price: "€1,050",
  meta: "28 m² · balcony · 15 min by metro",
  state: "Available",
  tone: "neutral",
  tags: ["Unfurnished", "Registration allowed"]
}];
function HousingScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-8) var(--space-10) var(--space-16)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "info",
    title: "These rooms come from our housing partner, not from us"
  }, "UniBridge NL does not rent out or guarantee housing. Our licensed intermediary sources the listings and holds the offer; we read every contract before you sign."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: 'var(--space-5)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, ROOMS.map(r => /*#__PURE__*/React.createElement(Card, {
    key: r.n,
    interactive: true,
    style: {
      display: 'grid',
      gridTemplateColumns: '150px 1fr auto',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4 / 3',
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 10px/1 var(--font-sans)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)'
    }
  }, "Room photo")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)'
    }
  }, r.n), /*#__PURE__*/React.createElement(Badge, {
    tone: r.tone,
    dot: r.tone === 'success'
  }, r.state)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, r.meta), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 'var(--space-3)'
    }
  }, r.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontVariationSettings: 'var(--display-variation)',
      fontWeight: 600,
      fontSize: 'var(--text-h3)',
      color: 'var(--text-heading)'
    }
  }, r.price), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, "per month"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, r.tone === 'success' ? /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, "Review contract") : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary"
  }, "Ask about it"), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Save to shortlist",
    placement: "left"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost"
  }, "Shortlist"))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 var(--space-4)'
    }
  }, "Search preferences"), /*#__PURE__*/React.createElement(Field, {
    label: "City",
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "Amsterdam",
    options: ["Amsterdam", "Utrecht", "Haarlem"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Max rent",
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "\u20AC1,000",
    options: ["€700", "€850", "€1,000", "€1,200"]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Registration address required",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Furnished only",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Share with flatmates"
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "ink"
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 var(--space-2)',
      color: 'var(--cream-200)'
    }
  }, "Contract check"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-sm)',
      color: 'var(--ink-100)'
    }
  }, "Send any contract \u2014 including one you found yourself \u2014 and we read it before you sign."), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    style: {
      marginTop: 'var(--space-4)'
    }
  }, "Send a contract")))));
}
Object.assign(window, {
  HousingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/HousingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/OverviewScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Badge,
  Alert,
  Stepper,
  Icon,
  Tabs,
  Tag,
  Tooltip
} = window.UnibridgeNLDesignSystem_3cb2d1;
function OverviewScreen({
  go,
  onUpload
}) {
  const [filter, setFilter] = React.useState("Open");
  const tasks = [{
    t: "Upload certified diploma",
    due: "Due 15 Oct",
    tone: "warning",
    state: "Open",
    who: "You"
  }, {
    t: "Sign Amsterdam room contract",
    due: "Due 22 Oct",
    tone: "warning",
    state: "Open",
    who: "You · via partner agency"
  }, {
    t: "Proof of funds letter",
    due: "Waiting on bank",
    tone: "neutral",
    state: "Waiting on us",
    who: "UniBridge"
  }, {
    t: "Erasmus application filed",
    due: "Done 2 Oct",
    tone: "success",
    state: "Done",
    who: "UniBridge"
  }, {
    t: "Passport scan checked",
    due: "Done 28 Sep",
    tone: "success",
    state: "Done",
    who: "UniBridge"
  }];
  const rows = tasks.filter(x => filter === "All" || x.state === filter);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-8) var(--space-10) var(--space-16)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "warning",
    title: "Two documents are blocking your UvA decision",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: onUpload
    }, "Upload now")
  }, "Certified diploma and proof of funds. UvA stops accepting late files on 15 October."), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ub-overline"
  }, "Your route \xB7 September 2026"), /*#__PURE__*/React.createElement(Stepper, {
    current: 2,
    style: {
      marginTop: 'var(--space-5)'
    },
    steps: [{
      label: "Profile",
      meta: "Complete"
    }, {
      label: "University choice",
      meta: "2 picked"
    }, {
      label: "Documents",
      meta: "3 of 5"
    }, {
      label: "Housing",
      meta: "Partner shortlist"
    }, {
      label: "Visa & BSN",
      meta: "Not started"
    }, {
      label: "Arrival",
      meta: "Not started"
    }]
  })), /*#__PURE__*/React.createElement(Row, null, [["Days to deadline", "9", "calendar-check", "warning"], ["Documents approved", "3 of 5", "file-check", "neutral"], ["Housing", "With partner", "house", "neutral"], ["Plan", "Bridge Full", "wallet", "neutral"]].map(([l, v, i, tone]) => /*#__PURE__*/React.createElement(Card, {
    key: l,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ub-overline"
  }, l), /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 18,
    color: "var(--gold-500)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontVariationSettings: 'var(--display-variation)',
      fontWeight: 600,
      fontSize: 30,
      color: 'var(--text-heading)',
      marginTop: 'var(--space-3)'
    }
  }, v)))), /*#__PURE__*/React.createElement(Row, {
    style: {
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      flex: '1 1 62%'
    },
    padding: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6) 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)'
    }
  }, "Checklist"), /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    items: ["Open", "Waiting on us", "Done", "All"],
    value: filter,
    onChange: setFilter
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)'
    }
  }, rows.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: x.t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) var(--space-6)',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 999,
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: x.tone === 'success' ? 'var(--moss-100)' : 'var(--surface-sunken)',
      color: x.tone === 'success' ? 'var(--moss-700)' : 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: x.tone === 'success' ? 'check' : 'circle',
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, x.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, x.due, " \xB7 ", x.who)), /*#__PURE__*/React.createElement(Badge, {
    tone: x.tone
  }, x.state), x.state === 'Open' && /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    onClick: onUpload
  }, "Do it"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 38%',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    rule: true
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 var(--space-3)'
    }
  }, "Your universities"), [["University of Amsterdam", "Decision expected 12 Nov", "warning"], ["Utrecht University", "Filed 28 Sep", "neutral"]].map(([n, s, tone]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      padding: 'var(--space-3) 0',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-sunken)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 700,
      color: 'var(--text-heading)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, s)), /*#__PURE__*/React.createElement(Badge, {
    tone: tone
  }, "In review"))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    style: {
      marginTop: 'var(--space-3)'
    },
    onClick: () => go('documents')
  }, "Add a third choice")), /*#__PURE__*/React.createElement(Card, {
    tone: "sunken",
    elevation: "none"
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 var(--space-2)'
    }
  }, "Next appointment"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-check",
    size: 18,
    color: "var(--moss-700)"
  }), "Call with Harsh \xB7 Thu 9 Oct, 15:00 CET"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, "Join call"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost"
  }, "Reschedule"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 var(--space-3)'
    }
  }, "Tagged for you"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, ["Amsterdam", "Data Science", "Non-EU", "Scholarship"].map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))))));
}
Object.assign(window, {
  OverviewScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/OverviewScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Shell.jsx
try { (() => {
const {
  Logo,
  Icon,
  IconButton,
  Badge,
  Tooltip,
  Tag
} = window.UnibridgeNLDesignSystem_3cb2d1;
const NAV = [["overview", "layout-dashboard", "Overview"], ["documents", "file-text", "Documents"], ["housing", "house", "Housing"], ["arrival", "plane-takeoff", "Arrival"], ["messages", "message-circle", "Messages"]];
function Sidebar({
  route,
  go
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flex: '0 0 auto',
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--space-6) var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 var(--space-2) var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-badge.jpg",
    alt: "UniBridge NL",
    style: {
      width: 34,
      height: 34,
      borderRadius: 999
    }
  }), /*#__PURE__*/React.createElement(Logo, {
    size: 22,
    tone: "cream"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, NAV.map(([k, i, l]) => {
    const on = route === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => go(k),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 44,
        padding: '0 var(--space-3)',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        background: on ? 'rgba(251,244,236,.10)' : 'transparent',
        color: on ? 'var(--cream-100)' : 'var(--ink-100)',
        font: (on ? 700 : 500) + ' 15px var(--font-sans)',
        textAlign: 'left',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: i,
      size: 19,
      color: on ? 'var(--gold-300)' : 'currentColor'
    }), l, k === 'documents' && /*#__PURE__*/React.createElement(Badge, {
      tone: "warning",
      style: {
        marginLeft: 'auto'
      }
    }, "3"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      background: 'rgba(251,244,236,.07)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 999,
      background: 'var(--gold-500)',
      color: 'var(--cream-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '700 14px var(--font-sans)'
    }
  }, "H"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 700,
      color: 'var(--cream-100)'
    }
  }, "Harsh Raj"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--ink-100)'
    }
  }, "Your advisor"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: "WhatsApp 06 25 29 40 80"
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "message-circle",
    label: "Message",
    size: "sm",
    style: {
      color: 'var(--cream-200)'
    }
  })), /*#__PURE__*/React.createElement(Tooltip, {
    label: "unibridgenl@gmail.com"
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "mail",
    label: "Email",
    size: "sm",
    style: {
      color: 'var(--cream-200)'
    }
  })))));
}
function Topbar({
  title,
  subtitle,
  right
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      padding: 'var(--space-8) var(--space-10) var(--space-6)',
      borderBottom: '1px solid var(--border-hairline)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-h2)',
      margin: 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, right));
}
function Row({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      ...style
    }
  }, children);
}
Object.assign(window, {
  Sidebar,
  Topbar,
  Row
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ApplyScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Field,
  Input,
  Select,
  Radio,
  Checkbox,
  Textarea,
  Stepper,
  Alert,
  Toast,
  Icon,
  Badge
} = window.UnibridgeNLDesignSystem_3cb2d1;
function ApplyScreen({
  go
}) {
  const [step, setStep] = React.useState(0);
  const [sent, setSent] = React.useState(false);
  const steps = [{
    label: "About you",
    meta: "2 min"
  }, {
    label: "Study plan",
    meta: "1 min"
  }, {
    label: "Services",
    meta: "30 sec"
  }];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 960,
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter-inline) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ub-overline"
  }, "Free application"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-h1)',
      margin: 'var(--space-3) 0 var(--space-2)'
    }
  }, "Let's map your route"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-muted)',
      maxWidth: '54ch'
    }
  }, "Three short steps. An advisor replies within one working day with a shortlist and the real costs."), /*#__PURE__*/React.createElement(Stepper, {
    current: step,
    steps: steps,
    style: {
      margin: 'var(--space-10) 0 var(--space-8)'
    }
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-8)"
  }, step === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "First name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "Amara"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Last name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "Osei"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    required: true,
    hint: "We reply here \u2014 check your spam folder once."
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    defaultValue: "amara.osei@mail.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "WhatsApp number"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "tel",
    placeholder: "+233 \u2026"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Country of citizenship",
    required: true
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "Ghana",
    options: ["Ghana", "India", "Türkiye", "Brazil", "Nigeria", "Other"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Highest diploma",
    required: true
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "Secondary school",
    options: ["Secondary school", "Bachelor", "Master"]
  }))), step === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Study level",
    required: true
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "lvl",
    defaultValue: "Master",
    options: ["Bachelor", "Master", "Exchange"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Intake",
    required: true
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "intake",
    defaultValue: "September 2026",
    options: ["September 2026", "February 2027", "Not sure yet"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Study field",
    required: true
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "Data Science",
    options: ["Data Science", "Business & Economics", "Engineering", "Law", "Health", "Arts"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Monthly budget for rent",
    hint: "Amsterdam averages \u20AC950 for a studio; nearby cities are cheaper."
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "\u20AC600 \u2013 \u20AC800",
    options: ["Under €600", "€600 – €800", "€800 – €1,000", "Over €1,000"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Anything we should know?",
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    placeholder: "Scholarships you're applying for, family in NL, health needs\u2026"
  }))), step === 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "warning",
    title: "September deadlines close 1 May"
  }, "Nine weeks left. Applications filed after 15 April get a rush fee from the university, not from us."), /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true,
    label: "University enrolment",
    description: "Up to five applications, documents certified and filed."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true,
    label: "Housing via our partner agency",
    description: "We refer you to a licensed intermediary and check the contract. We don't own or guarantee the rooms."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Visa & BSN",
    description: "Residence permit paperwork and a booked municipality appointment."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Arrival week",
    description: "Airport pickup, bike, SIM card, neighbourhood walk."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I agree to the privacy statement",
    description: "We share documents only with the universities you pick."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'var(--space-8)',
      borderTop: '1px solid var(--border-hairline)',
      paddingTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    disabled: step === 0,
    onClick: () => setStep(s => Math.max(0, s - 1)),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 16
    })
  }, "Back"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-subtle)'
    }
  }, "Step ", step + 1, " of 3 \xB7 nothing is charged today"), step < 2 ? /*#__PURE__*/React.createElement(Button, {
    onClick: () => setStep(s => s + 1),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Continue") : /*#__PURE__*/React.createElement(Button, {
    onClick: () => setSent(true)
  }, "Send my application"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      margin: 'var(--space-6) 0 0',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 16,
    color: "var(--moss-500)"
  }), "Documents encrypted, deleted on request"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 16,
    color: "var(--moss-500)"
  }), "Answer within 1 working day"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 16,
    color: "var(--moss-500)"
  }), "Or WhatsApp 06 25 29 40 80")), sent && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Application sent",
    message: "Harsh Raj, your advisor in Amsterdam, will reply by tomorrow afternoon.",
    onClose: () => setSent(false)
  })));
}
Object.assign(window, {
  ApplyScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ApplyScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BookCallScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Field,
  Input,
  Select,
  Icon,
  Badge,
  Alert,
  Toast,
  Tag
} = window.UnibridgeNLDesignSystem_3cb2d1;
const DAYS = [{
  d: "Mon",
  n: "6 Oct",
  slots: ["09:30", "11:00", "14:00"]
}, {
  d: "Tue",
  n: "7 Oct",
  slots: ["10:00", "13:30"]
}, {
  d: "Wed",
  n: "8 Oct",
  slots: ["09:00", "11:30", "15:00", "16:30"]
}, {
  d: "Thu",
  n: "9 Oct",
  slots: []
}, {
  d: "Fri",
  n: "10 Oct",
  slots: ["09:30", "12:00", "14:30"]
}];
function BookCallScreen({
  go
}) {
  const [day, setDay] = React.useState(0);
  const [slot, setSlot] = React.useState(null);
  const [booked, setBooked] = React.useState(false);
  const active = DAYS[day];
  if (booked) {
    return /*#__PURE__*/React.createElement("main", {
      style: {
        maxWidth: 720,
        margin: '0 auto',
        padding: 'var(--space-16) var(--gutter-inline) 0'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      rule: true,
      padding: "var(--space-8)"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ub-overline"
    }, "Booked"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--text-h2)',
        margin: 'var(--space-3) 0 var(--space-2)'
      }
    }, "You're in for ", active.d, " ", active.n, ", ", slot, " CET"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--text-body-lg)',
        color: 'var(--text-muted)'
      }
    }, "Harsh Raj will meet you on Google Meet. The invite and link are in your inbox \u2014 add it to your calendar so the reminder reaches you."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--surface-sunken)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4) var(--space-5)',
        margin: 'var(--space-6) 0'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "video",
      size: 20,
      color: "var(--gold-700)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-body-sm)',
        fontWeight: 700,
        color: 'var(--text-heading)'
      }
    }, "Google Meet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-caption)',
        color: 'var(--text-muted)'
      }
    }, "meet.google.com/ubn-", active.n.replace(' ', ''), "-", slot.replace(':', ''))), /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Join link")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => {
        setBooked(false);
        setSlot(null);
      }
    }, "Pick another time"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => go('apply')
    }, "Start my application instead"))));
  }
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 960,
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter-inline) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ub-overline"
  }, "Free 20-minute call"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-h1)',
      margin: 'var(--space-3) 0 var(--space-2)'
    }
  }, "Book a time on Google Meet"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-muted)',
      maxWidth: '56ch'
    }
  }, "Pick a slot that suits you. You'll get a Google Meet link by email straight away \u2014 no software to install, no payment, no obligation."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-10)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)'
    }
  }, "October 2026 \xB7 week 41"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, "Times shown in CET (Amsterdam)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 'var(--space-2)'
    }
  }, DAYS.map((x, i) => {
    const on = i === day,
      none = x.slots.length === 0;
    return /*#__PURE__*/React.createElement("button", {
      key: x.n,
      disabled: none,
      onClick: () => {
        setDay(i);
        setSlot(null);
      },
      style: {
        padding: 'var(--space-4) 0',
        border: '1px solid ' + (on ? 'var(--gold-500)' : 'var(--border-hairline)'),
        borderRadius: 'var(--radius-md)',
        cursor: none ? 'not-allowed' : 'pointer',
        background: on ? 'var(--surface-accent-soft)' : 'var(--surface-card)',
        opacity: none ? .45 : 1,
        transition: 'var(--transition-control)',
        fontFamily: 'var(--font-sans)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-caption)',
        color: 'var(--text-muted)'
      }
    }, x.d), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontVariationSettings: 'var(--display-variation)',
        fontWeight: 600,
        fontSize: 19,
        color: 'var(--text-heading)'
      }
    }, x.n.split(' ')[0]), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-caption)',
        color: 'var(--text-subtle)'
      }
    }, none ? 'full' : x.slots.length + ' slots'));
  })), /*#__PURE__*/React.createElement("hr", {
    className: "ub-rule",
    style: {
      margin: 'var(--space-6) 0 var(--space-5)',
      width: 56
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, active.slots.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setSlot(t),
    style: {
      height: 'var(--field-height)',
      padding: '0 22px',
      cursor: 'pointer',
      border: '1px solid ' + (slot === t ? 'var(--gold-500)' : 'var(--border-default)'),
      background: slot === t ? 'var(--gold-500)' : 'var(--surface-card)',
      color: slot === t ? 'var(--text-on-accent)' : 'var(--text-heading)',
      borderRadius: 'var(--radius-control)',
      font: '600 16px var(--font-sans)',
      transition: 'var(--transition-control)'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      background: 'var(--gold-500)',
      color: 'var(--cream-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '700 15px var(--font-sans)'
    }
  }, "H"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 700,
      color: 'var(--text-heading)'
    }
  }, "Harsh Raj"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, "Advisor \xB7 Amsterdam"))), /*#__PURE__*/React.createElement(Field, {
    label: "Your name",
    required: true,
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "Amara Osei"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    required: true,
    hint: "The Google Meet invite goes here.",
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    defaultValue: "amara.osei@mail.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Language",
    style: {
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "English",
    options: ["English", "Nederlands", "Hindi", "Français"]
  })), /*#__PURE__*/React.createElement(Button, {
    full: true,
    disabled: !slot,
    onClick: () => setBooked(true),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "video",
      size: 17
    })
  }, slot ? `Book ${active.d} ${slot}` : 'Pick a time first'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 'var(--space-4)',
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 14,
    color: "var(--moss-500)"
  }), "Prefer WhatsApp? 06 25 29 40 80")), /*#__PURE__*/React.createElement(Card, {
    tone: "sunken",
    elevation: "none"
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 var(--space-3)'
    }
  }, "What we'll cover"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-body)'
    }
  }, ["Which universities your grades actually clear", "Real costs: tuition, rent, proof of funds", "How housing works through our partner agency", "Dates you cannot miss for your intake"].map(x => /*#__PURE__*/React.createElement("div", {
    key: x,
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "var(--moss-500)"
  }), x)))))));
}
Object.assign(window, {
  BookCallScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BookCallScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
const {
  Button,
  Logo,
  Icon,
  Tag
} = window.UnibridgeNLDesignSystem_3cb2d1;
function SiteHeader({
  route,
  go
}) {
  const nav = [["home", "How it works"], ["universities", "Universities"], ["services", "Services"], ["apply", "Apply"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(251,244,236,.88)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '14px var(--gutter-inline)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => go('home'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-badge.jpg",
    alt: "UniBridge NL",
    style: {
      width: 40,
      height: 40,
      borderRadius: 999
    }
  }), /*#__PURE__*/React.createElement(Logo, {
    size: 26
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      marginLeft: 'auto'
    }
  }, nav.map(([k, l]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    onClick: () => go(k),
    style: {
      cursor: 'pointer',
      fontSize: 'var(--text-body-sm)',
      fontWeight: route === k ? 700 : 500,
      color: route === k ? 'var(--text-heading)' : 'var(--text-muted)',
      textDecoration: 'none',
      paddingBottom: 2,
      borderBottom: '2px solid ' + (route === k ? 'var(--gold-500)' : 'transparent')
    }
  }, l))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    onClick: () => go('call')
  }, "Book a call"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => go('apply')
  }, "Start free")));
}
function SiteFooter({
  go
}) {
  const cols = [["Programmes", ["Bachelor", "Master", "Exchange", "Foundation year"]], ["Services", ["Enrolment", "Housing", "Visa & BSN", "Bank & insurance"]], ["Company", ["About", "Partner universities", "Contact", "Privacy"]]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      marginTop: 'var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--space-16) var(--gutter-inline) var(--space-10)',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    size: 28,
    tone: "cream"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-4)',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--ink-100)',
      maxWidth: '32ch'
    }
  }, "Your bridge to student life in the Netherlands \u2014 enrolment, housing and arrival, handled in one place."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:unibridgenl@gmail.com",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 'var(--text-body-sm)',
      color: 'var(--cream-200)',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 17,
    color: "var(--gold-300)"
  }), "unibridgenl@gmail.com"), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/31625294080",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 'var(--text-body-sm)',
      color: 'var(--cream-200)',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 17,
    color: "var(--gold-300)"
  }), "WhatsApp 06 25 29 40 80"))), cols.map(([t, items]) => /*#__PURE__*/React.createElement("div", {
    key: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 12px/1 var(--font-sans)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--gold-300)',
      marginBottom: 'var(--space-4)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    onClick: () => go('services'),
    style: {
      cursor: 'pointer',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--cream-200)',
      textDecoration: 'none'
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--space-5) var(--gutter-inline)',
      borderTop: '1px solid rgba(251,244,236,.14)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--text-caption)',
      color: 'var(--ink-200)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 UniBridge NL \xB7 Amsterdam, KvK 90210345"), /*#__PURE__*/React.createElement("span", null, "Made for students, not for paperwork.")));
}
function Section({
  overline,
  title,
  lead,
  children,
  tone
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: tone === 'cream' ? 'var(--surface-page)' : 'transparent',
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-inline)'
    }
  }, overline && /*#__PURE__*/React.createElement("div", {
    className: "ub-overline"
  }, overline), overline && /*#__PURE__*/React.createElement("hr", {
    className: "ub-rule",
    style: {
      width: 56,
      margin: '12px 0 16px'
    }
  }), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-h2)',
      maxWidth: '24ch'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-muted)',
      maxWidth: '62ch'
    }
  }, lead), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-10)'
    }
  }, children)));
}
function Placeholder({
  label = "Photo",
  ratio = "4 / 3",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-media)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 11px/1 var(--font-sans)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)'
    }
  }, label));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  Section,
  Placeholder
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const {
  Button,
  Card,
  Icon,
  Badge,
  Tag,
  Stepper
} = window.UnibridgeNLDesignSystem_3cb2d1;
function HomeScreen({
  go
}) {
  const services = [["graduation-cap", "University enrolment", "We file your application at up to five Dutch universities and chase every decision."], ["house", "Housing support", "We work with a licensed housing intermediary who sources verified rooms, and we check the contract before you sign."], ["id-card", "Visa & BSN", "Residence permit paperwork and a booked BSN appointment in your arrival week."], ["wallet", "Bank & insurance", "A Dutch IBAN, student health insurance and your OV travel card, sorted."], ["bike", "Arrival week", "Airport pickup, a bike, SIM card and a walk through your new neighbourhood."], ["calendar-check", "Deadline tracking", "One checklist with every date, so nothing expires in a mailbox."]];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-20) 0 var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-inline)',
      display: 'grid',
      gridTemplateColumns: '1.05fr .95fr',
      gap: 'var(--space-16)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "September 2026 intake open"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-display-2)',
      lineHeight: 'var(--leading-tight)',
      margin: 'var(--space-5) 0 var(--space-4)'
    }
  }, "Your bridge to student life in the Netherlands"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-muted)',
      maxWidth: '46ch'
    }
  }, "You handle the studying. We handle enrolment, your residence permit and the first week \u2014 and put you in front of a licensed housing partner instead of a scam listing."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('apply'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Start my application"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => go('call')
  }, "Book a free call")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      marginTop: 'var(--space-10)'
    }
  }, [["1,400+", "students placed"], ["23", "partner universities"], ["1", "housing partner agency"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontVariationSettings: 'var(--display-variation)',
      fontWeight: 600,
      fontSize: 30,
      color: 'var(--text-heading)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    label: "Hero photo \xB7 students on a canal bridge",
    ratio: "4 / 5"
  }), /*#__PURE__*/React.createElement(Card, {
    elevation: "lg",
    style: {
      position: 'absolute',
      bottom: -26,
      left: -26,
      width: 290
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ub-overline"
  }, "Your checklist"), /*#__PURE__*/React.createElement(Stepper, {
    orientation: "vertical",
    current: 2,
    style: {
      marginTop: 12
    },
    steps: [{
      label: "Profile",
      meta: "Complete"
    }, {
      label: "University choice",
      meta: "Erasmus, Utrecht"
    }, {
      label: "Documents",
      meta: "2 of 5 uploaded"
    }, {
      label: "Housing partner"
    }]
  }))))), /*#__PURE__*/React.createElement(Section, {
    tone: "cream",
    overline: "What we do",
    title: "Everything between an offer letter and your first lecture",
    lead: "Six services, one fee, no forwarding you to a call centre."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-5)'
    }
  }, services.map(([icon, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    interactive: true,
    onClick: () => go('services')
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-accent-soft)',
      color: 'var(--gold-700)',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h4)',
      margin: 'var(--space-4) 0 var(--space-2)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, d))))), /*#__PURE__*/React.createElement(Section, {
    overline: "How it works",
    title: "Three steps, twelve weeks"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-8)'
    }
  }, [["01", "Tell us your plan", "A 20-minute call. Study level, field, budget, cities you'd live in."], ["02", "We build your route", "A shortlist of universities you'll actually get into, with dates and costs written out."], ["03", "You arrive settled", "A room found through our housing partner, bank card, BSN appointment and a bike in your arrival week."]].map(([n, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontVariationSettings: 'var(--display-variation)',
      fontWeight: 600,
      fontSize: 48,
      color: 'var(--gold-300)',
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("hr", {
    className: "ub-rule",
    style: {
      width: 40,
      margin: 'var(--space-4) 0'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h4)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, d))))), /*#__PURE__*/React.createElement(Section, {
    tone: "cream",
    overline: "Students",
    title: "What it felt like on the other side"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-5)'
    }
  }, [["Amara O.", "University of Amsterdam", "I landed on a Tuesday and had my BSN appointment on the Thursday. Nothing was left to figure out at the airport."], ["Diego F.", "Utrecht University, MSc Data Science", "They talked me out of two universities I would have wasted money applying to. That advice paid for the whole service."], ["Nour H.", "VU Amsterdam, BSc Architecture", "Housing was the part I was scared of. Their partner agency found the room and UniBridge read the contract before I signed."]].map(([n, s, q]) => /*#__PURE__*/React.createElement(Card, {
    key: n,
    rule: true
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontVariationSettings: 'var(--display-variation)',
      fontSize: 'var(--text-h4)',
      lineHeight: 1.45,
      color: 'var(--text-heading)'
    }
  }, q), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 999,
      background: 'var(--surface-tertiary-soft)',
      color: 'var(--moss-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '700 14px var(--font-sans)'
    }
  }, n[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 700,
      color: 'var(--text-heading)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, s))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-inline)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "ink",
    padding: "var(--space-16)",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr auto',
      gap: 'var(--space-10)',
      alignItems: 'center',
      borderRadius: 'var(--radius-2xl)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: 'var(--cream-200)',
      fontSize: 'var(--text-h2)',
      maxWidth: '26ch'
    }
  }, "Applications for September close on 1 May."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink-100)',
      fontSize: 'var(--text-body-lg)',
      margin: 0,
      maxWidth: '48ch'
    }
  }, "Start now and we'll map your route this week. No payment until you accept a plan.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('apply')
  }, "Start my application"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "ghost",
    style: {
      color: 'var(--cream-200)'
    }
  }, "See partner universities")))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServicesScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Icon,
  Badge,
  Alert,
  Tabs,
  Checkbox
} = window.UnibridgeNLDesignSystem_3cb2d1;
const PLANS = [{
  name: "Bridge Basic",
  price: "€390",
  note: "one-off",
  items: ["Two university applications", "Document check & certified copies", "Deadline tracking", "Email support in 1 working day"],
  cta: "secondary"
}, {
  name: "Bridge Full",
  price: "€890",
  note: "one-off · most chosen",
  items: ["Up to five applications", "Housing via partner agency", "Visa & BSN appointment booking", "Bank, insurance and OV card", "Arrival week support", "WhatsApp line to your advisor"],
  cta: "primary"
}, {
  name: "Bridge Family",
  price: "€1,290",
  note: "one-off",
  items: ["Everything in Bridge Full", "Parent briefing call in your language", "Guardianship paperwork under 18", "Two airport pickups"],
  cta: "secondary"
}];
function ServicesScreen({
  go
}) {
  const [tab, setTab] = React.useState("plans");
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Section, {
    overline: "Services & pricing",
    title: "One fee, written down before you pay",
    lead: "No commission from universities, no surprises in month three."
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    items: [{
      value: "plans",
      label: "Plans"
    }, {
      value: "included",
      label: "What's included"
    }, {
      value: "faq",
      label: "FAQ"
    }],
    value: tab,
    onChange: setTab,
    style: {
      marginBottom: 'var(--space-8)',
      display: 'inline-flex'
    }
  }), tab === "plans" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-5)',
      alignItems: 'start'
    }
  }, PLANS.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.name,
    elevation: p.cta === 'primary' ? 'lg' : 'sm',
    style: p.cta === 'primary' ? {
      border: '1px solid var(--gold-500)'
    } : undefined
  }, p.cta === 'primary' && /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    style: {
      marginBottom: 'var(--space-3)'
    }
  }, "Most chosen"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h4)',
      marginBottom: 'var(--space-2)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontVariationSettings: 'var(--display-variation)',
      fontWeight: 600,
      fontSize: 40,
      color: 'var(--text-heading)'
    }
  }, p.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, p.note)), /*#__PURE__*/React.createElement("hr", {
    className: "ub-rule",
    style: {
      margin: 'var(--space-5) 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, p.items.map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "var(--moss-500)"
  }), i))), /*#__PURE__*/React.createElement(Button, {
    full: true,
    variant: p.cta,
    onClick: () => go('apply'),
    style: {
      marginTop: 'var(--space-6)'
    }
  }, "Choose ", p.name.split(' ')[1])))), tab === "included" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-5)'
    }
  }, [["graduation-cap", "Enrolment", "Application filing, diploma certification, credential evaluation, decision chasing."], ["house", "Housing (via partner)", "Introduction to our licensed housing intermediary, contract review, deposit guidance, registration at the address."], ["id-card", "Visa & BSN", "Residence permit application, municipality appointment, proof-of-funds letter."], ["wallet", "Money & admin", "Dutch IBAN, student health insurance, OV chip card, DigiD walkthrough."]].map(([i, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-tertiary-soft)',
      color: 'var(--moss-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 6px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, d))))), tab === "faq" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      maxWidth: 'var(--prose-max)'
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "info",
    title: "Do you guarantee admission?"
  }, "No. Nobody honestly can. We only put universities on your list where your grades clear their bar, and we tell you the odds in plain numbers."), /*#__PURE__*/React.createElement(Alert, {
    tone: "info",
    title: "When do I pay?"
  }, "After the plan call, once you accept the route. Housing deposits go straight to the landlord, never to us."), /*#__PURE__*/React.createElement(Alert, {
    tone: "info",
    title: "What if my visa is refused?"
  }, "We refile once at no cost and, if it fails again, refund the visa portion of your fee."))), /*#__PURE__*/React.createElement(Section, {
    tone: "cream",
    overline: "Still deciding",
    title: "Take the 3-minute eligibility check"
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "I have a diploma or will graduate before September",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I can show proof of funds (approx. \u20AC14,000)"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I need housing as well as enrolment",
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Button, {
    style: {
      marginTop: 'var(--space-5)'
    },
    onClick: () => go('apply')
  }, "See my options"))));
}
Object.assign(window, {
  ServicesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServicesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/UniversitiesScreen.jsx
try { (() => {
const {
  Card,
  Tag,
  Badge,
  Button,
  Input,
  Select,
  Tabs,
  Icon,
  Tooltip
} = window.UnibridgeNLDesignSystem_3cb2d1;
const UNIS = [{
  name: "University of Amsterdam",
  city: "Amsterdam",
  level: "Bachelor · Master",
  fields: ["Business", "Economics", "Health"],
  tuition: "€2,530 / €16,900",
  deadline: "1 May",
  rate: "High"
}, {
  name: "Utrecht University",
  city: "Utrecht",
  level: "Master",
  fields: ["Data Science", "Law", "Humanities"],
  tuition: "€2,530 / €19,400",
  deadline: "1 April",
  rate: "Medium"
}, {
  name: "TU Delft",
  city: "Delft",
  level: "Bachelor · Master",
  fields: ["Engineering", "Architecture"],
  tuition: "€2,530 / €18,750",
  deadline: "15 January",
  rate: "Selective"
}, {
  name: "University of Groningen",
  city: "Groningen",
  level: "Bachelor",
  fields: ["Life Sciences", "Business", "Arts"],
  tuition: "€2,530 / €15,200",
  deadline: "1 May",
  rate: "High"
}, {
  name: "Tilburg University",
  city: "Tilburg",
  level: "Master",
  fields: ["Economics", "Psychology"],
  tuition: "€2,530 / €14,700",
  deadline: "1 June",
  rate: "High"
}];
function UniversitiesScreen({
  go
}) {
  const [city, setCity] = React.useState("All cities");
  const [level, setLevel] = React.useState("All");
  const rows = UNIS.filter(u => (city === "All cities" || u.city === city) && (level === "All" || u.level.includes(level)));
  const rateTone = {
    High: "success",
    Medium: "warning",
    Selective: "danger"
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      borderBottom: '1px solid var(--border-hairline)',
      padding: 'var(--space-12) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-inline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ub-overline"
  }, "23 partner universities"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-h1)',
      margin: 'var(--space-3) 0 var(--space-2)'
    }
  }, "Where you could study"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-muted)',
      maxWidth: '56ch'
    }
  }, "Tuition shown as EU / non-EU per year. Deadlines are the university's own \u2014 we file two weeks ahead of them."))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--gutter-inline) 0',
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search universities",
    iconLeft: "search"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ub-overline",
    style: {
      marginBottom: 'var(--space-3)'
    }
  }, "City"), /*#__PURE__*/React.createElement(Select, {
    value: city,
    onChange: e => setCity(e.target.value),
    options: ["All cities", "Amsterdam", "Utrecht", "Delft", "Groningen", "Tilburg"]
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ub-overline",
    style: {
      marginBottom: 'var(--space-3)'
    }
  }, "Study field"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, ["Business", "Engineering", "Data Science", "Law", "Health", "Arts"].map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement(Card, {
    tone: "sunken",
    elevation: "none"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 700,
      color: 'var(--text-heading)'
    }
  }, "Not sure yet?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)',
      margin: '6px 0 var(--space-4)'
    }
  }, "We'll shortlist five you can realistically get into."), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    full: true,
    onClick: () => go('apply')
  }, "Get my shortlist"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "All",
      label: "All levels"
    }, {
      value: "Bachelor",
      label: "Bachelor"
    }, {
      value: "Master",
      label: "Master"
    }],
    value: level,
    onChange: setLevel
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)'
    }
  }, rows.map(u => /*#__PURE__*/React.createElement(Card, {
    key: u.name,
    interactive: true,
    style: {
      display: 'grid',
      gridTemplateColumns: '96px 1fr auto',
      gap: 'var(--space-5)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    label: "Crest",
    ratio: "1 / 1",
    style: {
      borderRadius: 'var(--radius-md)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h4)',
      margin: 0
    }
  }, u.name), /*#__PURE__*/React.createElement(Badge, {
    tone: rateTone[u.rate],
    dot: true
  }, u.rate, " chance")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 6,
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 15
  }), u.city), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "graduation-cap",
    size: 15
  }), u.level), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-check",
    size: 15
  }), "Deadline ", u.deadline)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 'var(--space-3)'
    }
  }, u.fields.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: "EU / non-EU tuition per year",
    placement: "left"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontVariationSettings: 'var(--display-variation)',
      fontWeight: 600,
      fontSize: 'var(--text-h4)',
      color: 'var(--text-heading)'
    }
  }, u.tuition)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary"
  }, "Add to list")))))))));
}
Object.assign(window, {
  UniversitiesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/UniversitiesScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
