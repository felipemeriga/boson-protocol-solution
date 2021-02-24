


export class ValidationError extends Error {
    constructor(message: any) {
        super(message);
        this.name = "ValidationError";
    }
}

export class MnemonicArgumentError extends ValidationError {
    constructor(message: any) {
        super(message);
        this.name = "MnemonicArgumentError";
    }
}

export class MethodArgumentError extends ValidationError {
    constructor(message: any) {
        super(message);
        this.name = "MethodArgumentError";
    }
}

export class UnknownMethod extends ValidationError {
    constructor(message: any) {
        super(message);
        this.name = "UnknownMethod";
    }
}

export class AddressArgumentError extends ValidationError {
    constructor(message: any) {
        super(message);
        this.name = "AddressArgumentError";
    }
}

export class AddressFormatError extends ValidationError {
    constructor(message: any) {
        super(message);
        this.name = "AddressFormatError";
    }
}

export class ContractAlredyPaused extends ValidationError {
    constructor(message: any) {
        super(message);
        this.name = "ContractAlredyPaused";
    }
}
